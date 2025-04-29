console.log('sleep.js loaded');
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded in sleep.js');
    // Sleep Calculator Elements
    const calculateBedtimeBtn = document.getElementById('calculate-bedtime');
    const calculateWakeupBtn = document.getElementById('calculate-wakeup');
    const goBackBtn = document.getElementById('go-back');
    const resultsSection = document.getElementById('results');
    const wakeupSection = document.getElementById('wake-up-section');
    const bedtimeSection = document.getElementById('bedtime-section');
    const resultsSuggestions = document.getElementById('time-suggestions');
    const resultsTitle = document.getElementById('results-title');
    const resultsSubtitle = document.getElementById('results-subtitle');
    const infoCard = document.querySelector('.info-card');
    const cycleInfo = document.querySelector('.cycle-info');

    // Constants
    const SLEEP_CYCLE_DURATION = 90;
    const TIME_TO_FALL_ASLEEP = 15;
    const SUGGESTED_CYCLES = [6, 5];

    // Initially hide info sections
    if (infoCard) infoCard.style.display = 'none';
    if (cycleInfo) cycleInfo.style.display = 'none';

    function formatTime(hours, minutes, includeAmPm = true) {
        let period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        minutes = minutes.toString().padStart(2, '0');
        return `${hours}:${minutes}${includeAmPm ? ' ' + period : ''}`;
    }

    function convertTo24Hour(hours, minutes, period) {
        if (period === 'PM' && hours !== 12) {
            hours += 12;
        } else if (period === 'AM' && hours === 12) {
            hours = 0;
        }
        return { hours, minutes };
    }

    function calculateSleepTimes(wakeHours, wakeMinutes, wakePeriod) {
        const wakeTime = convertTo24Hour(wakeHours, wakeMinutes, wakePeriod);
        const sleepTimes = [];

        for (let i = 4; i <= 9; i++) {
            let totalMinutes = (wakeTime.hours * 60 + wakeTime.minutes) - 
                             (i * SLEEP_CYCLE_DURATION + TIME_TO_FALL_ASLEEP);
            
            while (totalMinutes < 0) {
                totalMinutes += 24 * 60;
            }

            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            
            sleepTimes.push({
                hours,
                minutes,
                suggested: SUGGESTED_CYCLES.includes(i)
            });
        }

        return sleepTimes;
    }

    function calculateWakeupTimes() {
        const now = new Date();
        const sleepTimes = [];

        for (let i = 4; i <= 9; i++) {
            let totalMinutes = (now.getHours() * 60 + now.getMinutes()) + 
                             (i * SLEEP_CYCLE_DURATION + TIME_TO_FALL_ASLEEP);
            
            while (totalMinutes >= 24 * 60) {
                totalMinutes -= 24 * 60;
            }

            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            
            sleepTimes.push({
                hours,
                minutes,
                suggested: SUGGESTED_CYCLES.includes(i)
            });
        }

        return sleepTimes.reverse();
    }

    function displaySleepTimes(times, isWakeupTime = false) {
        // Clear previous suggestions
        resultsSuggestions.innerHTML = '';

        // Create and add new time suggestions
        times.forEach(time => {
            const timeElement = document.createElement('div');
            timeElement.className = `time-option${time.suggested ? ' suggested' : ''}`;
            timeElement.innerHTML = `
                <div class="time">${formatTime(time.hours, time.minutes)}</div>
                ${time.suggested ? '<div class="suggested-tag">SUGGESTED</div>' : ''}
            `;
            resultsSuggestions.appendChild(timeElement);
        });

        // Show results section and hide others
        resultsSection.classList.remove('hidden');
        wakeupSection.style.display = 'none';
        bedtimeSection.style.display = 'none';

        // Update title and info based on calculation type
        if (isWakeupTime) {
            resultsTitle.textContent = 'Wake-up time';
            resultsSubtitle.textContent = 'If you go to sleep right now, you should try to wake up at one of the following times:';
            infoCard.classList.add('hidden');
            cycleInfo.classList.remove('hidden');
        } else {
            resultsTitle.textContent = 'Bedtime';
            resultsSubtitle.textContent = `To wake up at ${document.getElementById('hours').value}:${document.getElementById('minutes').value.padStart(2, '0')} ${document.getElementById('ampm').value}, you need to go to sleep at one of the following times:`;
            infoCard.classList.remove('hidden');
            cycleInfo.classList.add('hidden');
        }
    }

    // Event Listeners
    calculateBedtimeBtn?.addEventListener('click', () => {
        const hours = parseInt(document.getElementById('hours').value);
        const minutes = parseInt(document.getElementById('minutes').value);
        const period = document.getElementById('ampm').value;

        if (isNaN(hours) || isNaN(minutes)) {
            alert('Please enter valid hours and minutes');
            return;
        }

        const times = calculateSleepTimes(hours, minutes, period);
        displaySleepTimes(times);
    });

    calculateWakeupBtn?.addEventListener('click', () => {
        const times = calculateWakeupTimes();
        displaySleepTimes(times, true);
    });

    goBackBtn?.addEventListener('click', () => {
        resultsSection.classList.add('hidden');
        wakeupSection.style.display = 'block';
        bedtimeSection.style.display = 'block';
        infoCard.classList.add('hidden');
        cycleInfo.classList.add('hidden');
    });
});
