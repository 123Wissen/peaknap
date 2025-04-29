console.log('clockFeatures.js loaded');
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded in clockFeatures.js');
    // Get all sections
    const alarmSection = document.getElementById('alarm-section');
    const timerSection = document.getElementById('timer-section');
    const stopwatchSection = document.getElementById('stopwatch-section');
    const timeSection = document.getElementById('time-section');
    const mainCalculator = document.querySelector('.calculator-content');
    
    // Hide all clock sections initially
    const allClockSections = [alarmSection, timerSection, stopwatchSection, timeSection];
    allClockSections.forEach(section => {
        if(section) section.style.display = 'none';
    });

    // Clock Buttons Functionality
    const clockButtons = document.querySelectorAll('.menu-item.clock-btn');
    
    clockButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.dataset.type;
            
            if (mainCalculator) mainCalculator.style.display = 'none';

            clockButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            allClockSections.forEach(section => {
                if(section) section.style.display = 'none';
            });

            const selectedSection = document.getElementById(`${type}-section`);
            if (selectedSection) {
                selectedSection.style.display = 'block';
            }

            if (!document.querySelector('.back-button')) {
                addBackButton();
            }
            document.querySelector('.back-button').style.display = 'block';
        });
    });

    function addBackButton() {
        const backButton = document.createElement('button');
        backButton.className = 'back-button';
        backButton.innerHTML = '← Back to Sleep Calculator';
        document.querySelector('.calculator-card').prepend(backButton);

        backButton.addEventListener('click', function() {
            allClockSections.forEach(section => {
                if(section) section.style.display = 'none';
            });

            if (mainCalculator) mainCalculator.style.display = 'block';
            this.style.display = 'none';
            clockButtons.forEach(btn => btn.classList.remove('active'));
        });
    }

    // Alarm Clock Functionality
    let alarmTimeout;
    document.getElementById('set-alarm')?.addEventListener('click', function() {
        const hours = parseInt(document.getElementById('alarm-hours').value);
        const minutes = parseInt(document.getElementById('alarm-minutes').value);
        const ampm = document.getElementById('alarm-ampm').value;

        const now = new Date();
        const alarmTime = new Date();
        
        if (ampm === 'PM' && hours !== 12) alarmTime.setHours(hours + 12);
        else if (ampm === 'AM' && hours === 12) alarmTime.setHours(0);
        else alarmTime.setHours(hours);
        
        alarmTime.setMinutes(minutes);
        alarmTime.setSeconds(0);

        if (alarmTime < now) alarmTime.setDate(alarmTime.getDate() + 1);

        const timeToAlarm = alarmTime - now;
        
        alarmTimeout = setTimeout(() => {
            alert('Alarm!');
        }, timeToAlarm);

        alert(`Alarm set for ${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`);
    });

    // Timer Functionality
    let timerInterval;
    let timerRunning = false;
    let timerTime = 0;

    document.getElementById('start-timer')?.addEventListener('click', function() {
        if (!timerRunning) {
            const hours = parseInt(document.getElementById('timer-hours').value) || 0;
            const minutes = parseInt(document.getElementById('timer-minutes').value) || 0;
            const seconds = parseInt(document.getElementById('timer-seconds').value) || 0;
            timerTime = hours * 3600 + minutes * 60 + seconds;
            
            if (timerTime > 0) {
                timerRunning = true;
                timerInterval = setInterval(updateTimer, 1000);
            }
        }
    });

    document.getElementById('pause-timer')?.addEventListener('click', function() {
        clearInterval(timerInterval);
        timerRunning = false;
    });

    document.getElementById('reset-timer')?.addEventListener('click', function() {
        clearInterval(timerInterval);
        timerRunning = false;
        timerTime = 0;
        updateTimerDisplay();
    });

    function updateTimer() {
        if (timerTime > 0) {
            timerTime--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerRunning = false;
            alert('Timer finished!');
        }
    }

    function updateTimerDisplay() {
        const hours = Math.floor(timerTime / 3600);
        const minutes = Math.floor((timerTime % 3600) / 60);
        const seconds = timerTime % 60;
        
        document.getElementById('timer-hours').value = hours;
        document.getElementById('timer-minutes').value = minutes;
        document.getElementById('timer-seconds').value = seconds;
    }

    // Stopwatch Functionality
    let stopwatchInterval;
    let stopwatchRunning = false;
    let stopwatchTime = 0;

    document.getElementById('start-stopwatch')?.addEventListener('click', startStopwatch);
    document.getElementById('pause-stopwatch')?.addEventListener('click', pauseStopwatch);
    document.getElementById('reset-stopwatch')?.addEventListener('click', resetStopwatch);

    function startStopwatch() {
        if (!stopwatchRunning) {
            stopwatchRunning = true;
            stopwatchInterval = setInterval(updateStopwatch, 1000);
        }
    }

    function updateStopwatch() {
        stopwatchTime++;
        const hours = Math.floor(stopwatchTime / 3600);
        const minutes = Math.floor((stopwatchTime % 3600) / 60);
        const seconds = stopwatchTime % 60;
        
        document.querySelector('.stopwatch-display').textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function pauseStopwatch() {
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
    }

    function resetStopwatch() {
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
        stopwatchTime = 0;
        document.querySelector('.stopwatch-display').textContent = '00:00:00';
    }

    // Current Time Functionality
    function updateCurrentTime() {
        const timeDisplay = document.querySelector('.current-time-display');
        if (timeDisplay) {
            const now = new Date();
            timeDisplay.textContent = now.toLocaleTimeString();
        }
    }

    setInterval(updateCurrentTime, 1000);
    updateCurrentTime();
});
