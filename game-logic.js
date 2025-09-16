// Main Game Logic for Thought Trap Escape
class ThoughtTrapGame {
    constructor() {
        this.gameState = {
            currentScreen: 'lobby',
            gameMode: 'coop',
            teams: [],
            currentRound: 0,
            totalRounds: 1,
            timeLimit: 8 * 60, // in seconds
            locksPerRound: 4,
            contentPack: 'default',
            excludedTags: [],
            currentLocks: [],
            solvedLocks: [],
            timer: null,
            timeRemaining: 0,
            isPaused: false,
            currentTeamIndex: 0,
            currentLockId: null,
            turnTimeLimit: 60, // seconds per turn
            turnTimer: null,
            turnTimeRemaining: 0,
            accessibility: {
                highContrast: false,
                largeText: false,
                reduceMotion: false
            }
        };
        
        this.achievements = [];
        this.statistics = {
            gamesPlayed: 0,
            totalSolvedLocks: 0,
            averageTime: 0,
            bestTime: Infinity
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadSettings();
        this.updateUI();
    }
    
    setupEventListeners() {
        // Game mode selection
        document.getElementById('coop-mode').addEventListener('click', () => this.setGameMode('coop'));
        document.getElementById('versus-mode').addEventListener('click', () => this.setGameMode('versus'));
        
        // Team management
        document.getElementById('add-team').addEventListener('click', () => this.addTeam());
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-team')) {
                this.deleteTeam(e.target.closest('.team-card'));
            }
        });
        
        // Team name and color changes
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('team-name')) {
                this.updateTeamName(e.target);
            }
        });
        
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('team-color')) {
                this.updateTeamColor(e.target);
            }
        });
        
        // Content filters
        document.querySelectorAll('.content-filter').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateContentFilters());
        });
        
        // Accessibility options
        document.getElementById('high-contrast').addEventListener('change', (e) => {
            this.toggleAccessibility('highContrast', e.target.checked);
        });
        
        document.getElementById('large-text').addEventListener('change', (e) => {
            this.toggleAccessibility('largeText', e.target.checked);
        });
        
        document.getElementById('reduce-motion').addEventListener('change', (e) => {
            this.toggleAccessibility('reduceMotion', e.target.checked);
        });
        
        // Game controls
        document.getElementById('start-game').addEventListener('click', () => this.startGame());
        document.getElementById('pause-btn').addEventListener('click', () => this.togglePause());
        document.getElementById('end-game').addEventListener('click', () => this.endGame());
        document.getElementById('new-round').addEventListener('click', () => this.startNewRound());
        
        // Modal controls
        document.getElementById('close-modal').addEventListener('click', () => this.closeLockModal());
        document.getElementById('close-lock').addEventListener('click', () => this.closeLockModal());
        document.getElementById('close-lock-versus').addEventListener('click', () => this.closeLockModal());
        document.getElementById('mark-solved').addEventListener('click', () => this.markLockSolved());
        
        // Versus mode controls
        document.getElementById('team-solved').addEventListener('click', () => this.teamSolvedLock());
        document.getElementById('pass-turn').addEventListener('click', () => this.passTurn());
        document.getElementById('skip-lock').addEventListener('click', () => this.skipLock());
        
        // Game over modal
        document.getElementById('play-again').addEventListener('click', () => this.playAgain());
        document.getElementById('back-to-lobby').addEventListener('click', () => this.backToLobby());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    setGameMode(mode) {
        this.gameState.gameMode = mode;
        
        // Update UI
        document.getElementById('coop-mode').classList.toggle('bg-indigo-600', mode === 'coop');
        document.getElementById('coop-mode').classList.toggle('text-white', mode === 'coop');
        document.getElementById('coop-mode').classList.toggle('bg-gray-200', mode !== 'coop');
        document.getElementById('coop-mode').classList.toggle('text-gray-800', mode !== 'coop');
        
        document.getElementById('versus-mode').classList.toggle('bg-indigo-600', mode === 'versus');
        document.getElementById('versus-mode').classList.toggle('text-white', mode === 'versus');
        document.getElementById('versus-mode').classList.toggle('bg-gray-200', mode !== 'versus');
        document.getElementById('versus-mode').classList.toggle('text-gray-800', mode !== 'versus');
    }
    
    addTeam() {
        const teamId = this.gameState.teams.length + 1;
        const availableColors = Object.keys(GAME_DATA.teamColors);
        const usedColors = this.gameState.teams.map(team => team.color);
        const availableColor = availableColors.find(color => !usedColors.includes(color)) || 'blue';
        
        const team = {
            id: teamId,
            name: `Team ${teamId}`,
            color: availableColor,
            score: 0
        };
        
        this.gameState.teams.push(team);
        this.renderTeams();
    }
    
    deleteTeam(teamCard) {
        const teamId = parseInt(teamCard.dataset.teamId);
        this.gameState.teams = this.gameState.teams.filter(team => team.id !== teamId);
        this.renderTeams();
    }
    
    updateTeamName(input) {
        const teamCard = input.closest('.team-card');
        const teamId = parseInt(teamCard.dataset.teamId);
        const team = this.gameState.teams.find(t => t.id === teamId);
        if (team) {
            team.name = input.value;
        }
    }
    
    updateTeamColor(select) {
        const teamCard = select.closest('.team-card');
        const teamId = parseInt(teamCard.dataset.teamId);
        const team = this.gameState.teams.find(t => t.id === teamId);
        if (team) {
            team.color = select.value;
            this.updateTeamCardColor(teamCard, select.value);
        }
    }
    
    updateTeamCardColor(teamCard, color) {
        const colorInfo = GAME_DATA.teamColors[color];
        teamCard.className = `team-card mb-4 p-4 rounded-lg ${colorInfo.class}`;
    }
    
    renderTeams() {
        const container = document.getElementById('teams-container');
        container.innerHTML = '';
        
        this.gameState.teams.forEach(team => {
            const colorInfo = GAME_DATA.teamColors[team.color];
            const teamHTML = `
                <div class="team-card mb-4 p-4 rounded-lg ${colorInfo.class}" data-team-id="${team.id}">
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="font-medium">Team ${team.id}</h3>
                        <button class="delete-team text-red-500 hover:text-red-700 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <input type="text" value="${team.name}" class="team-name w-full py-1 px-2 border border-gray-300 rounded-md mb-2">
                    <div class="flex items-center">
                        <span class="mr-2 text-sm">Color:</span>
                        <select class="team-color py-1 px-2 border border-gray-300 rounded-md">
                            ${Object.entries(GAME_DATA.teamColors).map(([key, value]) => 
                                `<option value="${key}" ${team.color === key ? 'selected' : ''}>${value.display}</option>`
                            ).join('')}
                        </select>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', teamHTML);
        });
    }
    
    updateContentFilters() {
        this.gameState.excludedTags = [];
        document.querySelectorAll('.content-filter:checked').forEach(checkbox => {
            this.gameState.excludedTags.push(checkbox.dataset.filter);
        });
    }
    
    toggleAccessibility(type, enabled) {
        this.gameState.accessibility[type] = enabled;
        
        switch (type) {
            case 'highContrast':
                document.body.classList.toggle('high-contrast', enabled);
                break;
            case 'largeText':
                document.body.classList.toggle('large-text', enabled);
                break;
            case 'reduceMotion':
                document.body.classList.toggle('reduce-motion', enabled);
                break;
        }
    }
    
    startGame() {
        // Validate setup
        if (this.gameState.teams.length < 1) {
            alert('Please add at least one team to start the game.');
            return;
        }
        
        // Get settings
        this.gameState.timeLimit = parseInt(document.getElementById('timer').value) * 60;
        this.gameState.locksPerRound = parseInt(document.getElementById('locks').value);
        this.gameState.contentPack = document.getElementById('content-pack').value;
        
        // Initialize game
        this.gameState.currentRound = 1;
        this.gameState.teams.forEach(team => team.score = 0);
        this.gameState.solvedLocks = [];
        
        // Switch to game screen
        this.switchScreen('escape-room');
        this.startNewRound();
    }
    
    startNewRound() {
        // Generate locks for this round
        this.generateLocks();
        
        // Reset timer
        this.gameState.timeRemaining = this.gameState.timeLimit;
        this.gameState.isPaused = false;
        
        // Reset turn-based state
        this.gameState.currentTeamIndex = 0;
        this.gameState.currentLockId = null;
        this.gameState.turnTimeRemaining = this.gameState.turnTimeLimit;
        
        // Update UI
        this.renderLocks();
        this.renderProgressLights();
        this.renderTeamScores();
        this.updateTurnDisplay();
        this.startTimer();
        
        // Start turn timer for versus mode
        if (this.gameState.gameMode === 'versus') {
            this.startTurnTimer();
        }
    }
    
    generateLocks() {
        this.gameState.currentLocks = GameDataUtils.getThoughtTraps(
            this.gameState.contentPack,
            this.gameState.excludedTags,
            this.gameState.locksPerRound
        );
        
        // Add solved status to each lock
        this.gameState.currentLocks.forEach(lock => {
            lock.solved = false;
            lock.solvedBy = null;
            lock.solveTime = null;
        });
    }
    
    renderLocks() {
        const container = document.getElementById('locks-grid');
        container.innerHTML = '';
        
        this.gameState.currentLocks.forEach((lock, index) => {
            let lockClasses = 'lock-card';
            let clickable = true;
            
            if (lock.solved) {
                lockClasses += ' solved';
                clickable = false;
            } else if (this.gameState.gameMode === 'versus') {
                // In versus mode, only available locks for current turn should be highlighted
                if (this.gameState.currentLockId === null) {
                    lockClasses += ' current-turn-available';
                } else if (this.gameState.currentLockId !== lock.id) {
                    lockClasses += ' not-current-turn';
                    clickable = false;
                }
            }
            
            const lockHTML = `
                <div class="${lockClasses}" data-lock-id="${lock.id}">
                    <div class="lock-dial ${lock.solved ? 'solved' : ''}">
                        <div class="lock-dial-inner">
                            ${index + 1}
                        </div>
                    </div>
                    <h3 class="text-lg font-semibold mt-4 mb-2">${lock.title}</h3>
                    <p class="text-sm text-gray-600 mb-4">${lock.description.substring(0, 100)}...</p>
                    <div class="flex justify-between items-center">
                        <span class="text-xs px-2 py-1 bg-gray-200 rounded-full">${lock.difficulty}</span>
                        ${lock.solved ? 
                            `<span class="text-green-600 font-semibold">✓ Solved by ${lock.solvedBy || 'Team'}</span>` :
                            clickable ? 
                                `<button class="text-indigo-600 hover:text-indigo-800 font-medium">Open Lock</button>` :
                                `<span class="text-gray-400">Not Available</span>`
                        }
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', lockHTML);
        });
        
        // Add click listeners to lock cards
        container.querySelectorAll('.lock-card').forEach(card => {
            card.addEventListener('click', () => {
                const lockId = parseInt(card.dataset.lockId);
                const lock = this.gameState.currentLocks.find(l => l.id === lockId);
                
                // Check if lock is clickable
                if (lock && !lock.solved) {
                    if (this.gameState.gameMode === 'coop' || 
                        this.gameState.currentLockId === null || 
                        this.gameState.currentLockId === lockId) {
                        this.openLock(lockId);
                    }
                }
            });
        });
    }
    
    renderProgressLights() {
        const container = document.getElementById('progress-lights');
        container.innerHTML = '';
        
        for (let i = 0; i < this.gameState.locksPerRound; i++) {
            const isOn = i < this.gameState.currentLocks.filter(lock => lock.solved).length;
            container.insertAdjacentHTML('beforeend', 
                `<div class="progress-light ${isOn ? 'on' : ''}"></div>`
            );
        }
    }
    
    renderTeamScores() {
        const container = document.getElementById('team-scores');
        container.innerHTML = '';
        
        // Sort teams by score for display
        const sortedTeams = [...this.gameState.teams].sort((a, b) => b.score - a.score);
        const highestScore = sortedTeams[0]?.score || 0;
        const currentTeam = this.gameState.teams[this.gameState.currentTeamIndex];
        
        sortedTeams.forEach(team => {
            const colorInfo = GAME_DATA.teamColors[team.color];
            const isLeading = team.score === highestScore && highestScore > 0;
            const isCurrentTurn = this.gameState.gameMode === 'versus' && currentTeam && team.id === currentTeam.id;
            
            let classes = `team-score ${colorInfo.class} px-4 py-2 rounded-lg flex items-center`;
            if (isLeading) classes += ' leading';
            if (isCurrentTurn) classes += ' current-turn';
            
            const scoreHTML = `
                <div class="${classes}">
                    <div class="w-4 h-4 rounded-full mr-2" style="background-color: ${colorInfo.color}"></div>
                    <span class="font-medium">${team.name}:</span>
                    <span class="ml-2 font-bold">${team.score}</span>
                    ${isCurrentTurn ? '<span class="ml-2 text-xs">👑 TURN</span>' : ''}
                </div>
            `;
            container.insertAdjacentHTML('beforeend', scoreHTML);
        });
    }
    
    startTimer() {
        this.updateTimerDisplay();
        
        this.gameState.timer = setInterval(() => {
            if (!this.gameState.isPaused) {
                this.gameState.timeRemaining--;
                this.updateTimerDisplay();
                
                if (this.gameState.timeRemaining <= 0) {
                    this.timeUp();
                }
            }
        }, 1000);
    }
    
    updateTimerDisplay() {
        const minutes = Math.floor(this.gameState.timeRemaining / 60);
        const seconds = this.gameState.timeRemaining % 60;
        const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById('timer-display').textContent = display;
        
        // Update timer bar
        const percentage = (this.gameState.timeRemaining / this.gameState.timeLimit) * 100;
        document.getElementById('timer-bar').style.width = `${percentage}%`;
    }
    
    togglePause() {
        this.gameState.isPaused = !this.gameState.isPaused;
        const btn = document.getElementById('pause-btn');
        btn.textContent = this.gameState.isPaused ? 'Resume' : 'Pause';
        
        document.getElementById('escape-room').classList.toggle('game-paused', this.gameState.isPaused);
    }
    
    openLock(lockId) {
        const lock = this.gameState.currentLocks.find(l => l.id === lockId);
        if (!lock || lock.solved) return;
        
        // Set current lock for versus mode
        if (this.gameState.gameMode === 'versus') {
            this.gameState.currentLockId = lockId;
            this.renderLocks(); // Update lock states
        }
        
        // Show lock modal
        document.getElementById('lock-title').textContent = lock.title;
        
        const content = `
            <div class="thought-trap-card">
                <div class="thought-trap-title">${lock.title}</div>
                <div class="thought-trap-description">${lock.description}</div>
            </div>
            <div class="mt-4">
                <h4 class="font-semibold mb-2">Example:</h4>
                <p class="text-gray-700 italic">"${lock.example}"</p>
            </div>
            <div class="mt-4">
                <h4 class="font-semibold mb-2">Tags:</h4>
                <div class="flex flex-wrap gap-2">
                    ${lock.tags.map(tag => 
                        `<span class="px-2 py-1 bg-gray-200 rounded-full text-xs">${tag}</span>`
                    ).join('')}
                </div>
            </div>
        `;
        
        document.getElementById('lock-content').innerHTML = content;
        
        // Show appropriate buttons based on game mode
        if (this.gameState.gameMode === 'coop') {
            document.getElementById('coop-buttons').classList.remove('hidden');
            document.getElementById('versus-buttons').classList.add('hidden');
        } else {
            document.getElementById('coop-buttons').classList.add('hidden');
            document.getElementById('versus-buttons').classList.remove('hidden');
            this.updateVersusModalContent();
        }
        
        document.getElementById('lock-modal').classList.remove('hidden');
        document.getElementById('lock-modal').dataset.lockId = lockId;
        
        // Add modal animation
        const modal = document.getElementById('lock-modal').querySelector('.relative');
        modal.classList.add('modal-enter');
    }
    
    markLockSolved() {
        const lockId = parseInt(document.getElementById('lock-modal').dataset.lockId);
        const lock = this.gameState.currentLocks.find(l => l.id === lockId);
        
        if (!lock || lock.solved) return;
        
        // Mark as solved
        lock.solved = true;
        lock.solveTime = this.gameState.timeLimit - this.gameState.timeRemaining;
        lock.solvedBy = 'All Teams';
        
        // Award points (in co-op mode, all teams get points)
        if (this.gameState.gameMode === 'coop') {
            this.gameState.teams.forEach(team => team.score++);
        }
        
        // Show key
        this.showKey(lock);
        
        // Update UI
        this.renderLocks();
        this.renderProgressLights();
        this.renderTeamScores();
        
        // Check if round is complete
        if (this.gameState.currentLocks.every(l => l.solved)) {
            this.roundComplete();
        }
        
        // Close modal
        this.closeLockModal();
        
        // Add celebration effect
        this.addCelebrationEffect();
    }
    
    showKey(lock) {
        const key = GameDataUtils.getKey(lock.id);
        if (!key) return;
        
        // Create temporary key display
        const keyDisplay = document.createElement('div');
        keyDisplay.className = 'fixed top-4 right-4 key-card p-4 z-50';
        keyDisplay.innerHTML = `
            <h4 class="font-bold mb-2">🗝️ ${key.title}</h4>
            <p class="text-sm mb-2">${key.description}</p>
            <p class="text-xs italic">${key.technique}</p>
        `;
        
        document.body.appendChild(keyDisplay);
        
        // Remove after 5 seconds
        setTimeout(() => {
            keyDisplay.remove();
        }, 5000);
    }
    
    addCelebrationEffect() {
        const celebration = document.createElement('div');
        celebration.className = 'celebration fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50';
        celebration.style.pointerEvents = 'none';
        
        document.body.appendChild(celebration);
        
        setTimeout(() => {
            celebration.remove();
        }, 1000);
    }
    
    roundComplete() {
        // Stop timer
        if (this.gameState.timer) {
            clearInterval(this.gameState.timer);
        }
        
        // Show completion message
        setTimeout(() => {
            if (this.gameState.gameMode === 'coop') {
                alert('Congratulations! You\'ve escaped this round of thought traps!');
            } else {
                alert('Round complete! Check the scores to see who\'s winning.');
            }
        }, 1000);
    }
    
    timeUp() {
        if (this.gameState.timer) {
            clearInterval(this.gameState.timer);
        }
        
        alert('Time\'s up! Don\'t worry - recognizing thought traps takes practice.');
        this.endGame();
    }
    
    endGame() {
        if (this.gameState.timer) {
            clearInterval(this.gameState.timer);
        }
        
        this.showGameOverModal();
    }
    
    showGameOverModal() {
        const modal = document.getElementById('game-over-modal');
        const scoresContainer = document.getElementById('final-scores');
        
        // Sort teams by score
        const sortedTeams = [...this.gameState.teams].sort((a, b) => b.score - a.score);
        
        let scoresHTML = '<h4 class="text-lg font-semibold mb-4">Final Scores:</h4>';
        sortedTeams.forEach((team, index) => {
            const colorInfo = GAME_DATA.teamColors[team.color];
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
            
            scoresHTML += `
                <div class="flex items-center justify-between mb-2 p-2 rounded ${colorInfo.class}">
                    <span class="font-medium">${medal} ${team.name}</span>
                    <span class="font-bold">${team.score} locks solved</span>
                </div>
            `;
        });
        
        scoresContainer.innerHTML = scoresHTML;
        modal.classList.remove('hidden');
        
        // Update statistics
        this.updateStatistics();
    }
    
    updateStatistics() {
        this.statistics.gamesPlayed++;
        this.statistics.totalSolvedLocks += this.gameState.currentLocks.filter(l => l.solved).length;
        
        const gameTime = this.gameState.timeLimit - this.gameState.timeRemaining;
        this.statistics.averageTime = (this.statistics.averageTime * (this.statistics.gamesPlayed - 1) + gameTime) / this.statistics.gamesPlayed;
        
        if (gameTime < this.statistics.bestTime) {
            this.statistics.bestTime = gameTime;
        }
    }
    
    playAgain() {
        document.getElementById('game-over-modal').classList.add('hidden');
        this.startNewRound();
    }
    
    backToLobby() {
        document.getElementById('game-over-modal').classList.add('hidden');
        this.switchScreen('lobby');
        
        if (this.gameState.timer) {
            clearInterval(this.gameState.timer);
        }
    }
    
    switchScreen(screenName) {
        document.getElementById('lobby').classList.toggle('hidden', screenName !== 'lobby');
        document.getElementById('escape-room').classList.toggle('hidden', screenName !== 'escape-room');
        this.gameState.currentScreen = screenName;
    }
    
    handleKeyboard(e) {
        // Keyboard shortcuts
        if (e.key === 'Escape') {
            this.closeLockModal();
        } else if (e.key === ' ' && this.gameState.currentScreen === 'escape-room') {
            e.preventDefault();
            this.togglePause();
        }
    }
    
    loadSettings() {
        // Load saved settings from localStorage
        const saved = localStorage.getItem('thoughtTrapSettings');
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                // Apply saved settings
                if (settings.accessibility) {
                    Object.entries(settings.accessibility).forEach(([key, value]) => {
                        this.toggleAccessibility(key, value);
                        const checkbox = document.getElementById(key.replace(/([A-Z])/g, '-$1').toLowerCase());
                        if (checkbox) checkbox.checked = value;
                    });
                }
            } catch (e) {
                console.warn('Could not load saved settings:', e);
            }
        }
        
        // Initialize default teams
        if (this.gameState.teams.length === 0) {
            this.addTeam();
            this.addTeam();
        }
    }
    
    saveSettings() {
        const settings = {
            accessibility: this.gameState.accessibility,
            statistics: this.statistics
        };
        localStorage.setItem('thoughtTrapSettings', JSON.stringify(settings));
    }
    
    updateUI() {
        this.renderTeams();
    }
    
    // Turn-based game methods
    updateTurnDisplay() {
        const isVersus = this.gameState.gameMode === 'versus';
        const turnIndicator = document.getElementById('current-turn-indicator');
        const turnTimerContainer = document.getElementById('turn-timer-container');
        
        if (isVersus && this.gameState.teams.length > 1) {
            const currentTeam = this.gameState.teams[this.gameState.currentTeamIndex];
            const colorInfo = GAME_DATA.teamColors[currentTeam.color];
            
            // Show turn indicator
            turnIndicator.classList.remove('hidden');
            turnIndicator.className = `mt-4 p-3 rounded-lg border-2 border-dashed current-turn-indicator ${colorInfo.class}`;
            document.getElementById('current-team-name').textContent = currentTeam.name;
            document.getElementById('current-team-color').style.backgroundColor = colorInfo.color;
            
            // Show turn timer
            turnTimerContainer.classList.remove('hidden');
        } else {
            turnIndicator.classList.add('hidden');
            turnTimerContainer.classList.add('hidden');
        }
    }
    
    startTurnTimer() {
        this.updateTurnTimerDisplay();
        
        if (this.gameState.turnTimer) {
            clearInterval(this.gameState.turnTimer);
        }
        
        this.gameState.turnTimer = setInterval(() => {
            if (!this.gameState.isPaused) {
                this.gameState.turnTimeRemaining--;
                this.updateTurnTimerDisplay();
                
                if (this.gameState.turnTimeRemaining <= 0) {
                    this.turnTimeUp();
                }
            }
        }, 1000);
    }
    
    updateTurnTimerDisplay() {
        const minutes = Math.floor(this.gameState.turnTimeRemaining / 60);
        const seconds = this.gameState.turnTimeRemaining % 60;
        const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById('turn-timer-display').textContent = display;
        
        // Update turn timer bar
        const percentage = (this.gameState.turnTimeRemaining / this.gameState.turnTimeLimit) * 100;
        const turnTimerBar = document.getElementById('turn-timer-bar');
        turnTimerBar.style.width = `${percentage}%`;
        
        // Add warning classes
        turnTimerBar.classList.remove('turn-timer-warning', 'turn-timer-critical');
        if (this.gameState.turnTimeRemaining <= 10) {
            turnTimerBar.classList.add('turn-timer-critical');
        } else if (this.gameState.turnTimeRemaining <= 20) {
            turnTimerBar.classList.add('turn-timer-warning');
        }
        
        // Update modal timer if open
        const modalTimer = document.getElementById('modal-turn-timer');
        if (modalTimer) {
            modalTimer.textContent = display;
        }
    }
    
    updateVersusModalContent() {
        const currentTeam = this.gameState.teams[this.gameState.currentTeamIndex];
        const colorInfo = GAME_DATA.teamColors[currentTeam.color];
        
        // Update current team display
        document.getElementById('modal-current-team').textContent = currentTeam.name;
        document.getElementById('modal-current-team').style.color = colorInfo.color;
        
        // Update steal buttons
        const stealContainer = document.getElementById('steal-buttons');
        stealContainer.innerHTML = '';
        
        this.gameState.teams.forEach(team => {
            if (team.id !== currentTeam.id) {
                const teamColorInfo = GAME_DATA.teamColors[team.color];
                const stealButton = document.createElement('button');
                stealButton.className = `steal-button team-${team.color} text-white py-2 px-4 rounded-md font-medium`;
                stealButton.textContent = `${team.name} Steals`;
                stealButton.addEventListener('click', () => this.stealLock(team.id));
                stealContainer.appendChild(stealButton);
            }
        });
    }
    
    teamSolvedLock() {
        const lockId = parseInt(document.getElementById('lock-modal').dataset.lockId);
        const lock = this.gameState.currentLocks.find(l => l.id === lockId);
        const currentTeam = this.gameState.teams[this.gameState.currentTeamIndex];
        
        if (!lock || lock.solved || !currentTeam) return;
        
        // Mark as solved by current team
        lock.solved = true;
        lock.solvedBy = currentTeam.name;
        lock.solveTime = this.gameState.turnTimeLimit - this.gameState.turnTimeRemaining;
        
        // Award points to current team
        currentTeam.score++;
        
        // Show key
        this.showKey(lock);
        
        // Update UI
        this.renderLocks();
        this.renderProgressLights();
        this.renderTeamScores();
        
        // Close modal and advance turn
        this.closeLockModal();
        this.nextTurn();
        
        // Check if round is complete
        if (this.gameState.currentLocks.every(l => l.solved)) {
            this.roundComplete();
        }
        
        // Add celebration effect
        this.addCelebrationEffect();
    }
    
    stealLock(teamId) {
        const lockId = parseInt(document.getElementById('lock-modal').dataset.lockId);
        const lock = this.gameState.currentLocks.find(l => l.id === lockId);
        const stealingTeam = this.gameState.teams.find(t => t.id === teamId);
        
        if (!lock || lock.solved || !stealingTeam) return;
        
        // Mark as solved by stealing team
        lock.solved = true;
        lock.solvedBy = stealingTeam.name;
        lock.solveTime = this.gameState.turnTimeLimit - this.gameState.turnTimeRemaining;
        
        // Award points to stealing team
        stealingTeam.score++;
        
        // Show key
        this.showKey(lock);
        
        // Update UI
        this.renderLocks();
        this.renderProgressLights();
        this.renderTeamScores();
        
        // Close modal and advance turn
        this.closeLockModal();
        this.nextTurn();
        
        // Check if round is complete
        if (this.gameState.currentLocks.every(l => l.solved)) {
            this.roundComplete();
        }
        
        // Add celebration effect
        this.addCelebrationEffect();
    }
    
    passTurn() {
        this.closeLockModal();
        this.nextTurn();
    }
    
    skipLock() {
        const lockId = parseInt(document.getElementById('lock-modal').dataset.lockId);
        const lock = this.gameState.currentLocks.find(l => l.id === lockId);
        
        if (lock) {
            // Mark as skipped (could be attempted again later)
            // For now, just close and advance turn
        }
        
        this.closeLockModal();
        this.nextTurn();
    }
    
    nextTurn() {
        // Reset current lock
        this.gameState.currentLockId = null;
        
        // Advance to next team
        this.gameState.currentTeamIndex = (this.gameState.currentTeamIndex + 1) % this.gameState.teams.length;
        
        // Reset turn timer
        this.gameState.turnTimeRemaining = this.gameState.turnTimeLimit;
        
        // Update displays
        this.updateTurnDisplay();
        this.renderTeamScores();
        this.renderLocks();
        
        // Restart turn timer
        if (this.gameState.gameMode === 'versus') {
            this.startTurnTimer();
        }
    }
    
    turnTimeUp() {
        if (this.gameState.turnTimer) {
            clearInterval(this.gameState.turnTimer);
        }
        
        // Close any open modal
        this.closeLockModal();
        
        // Advance to next turn
        this.nextTurn();
        
        // Show notification
        const currentTeam = this.gameState.teams[this.gameState.currentTeamIndex];
        // Note: In a real implementation, you might want to show a toast notification
        // instead of an alert for better UX
    }
    
    closeLockModal() {
        const modal = document.getElementById('lock-modal');
        const modalContent = modal.querySelector('.relative');
        
        // Reset current lock in versus mode
        if (this.gameState.gameMode === 'versus') {
            this.gameState.currentLockId = null;
            this.renderLocks(); // Update lock states
        }
        
        modalContent.classList.add('modal-exit');
        setTimeout(() => {
            modal.classList.add('hidden');
            modalContent.classList.remove('modal-enter', 'modal-exit');
        }, 300);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.game = new ThoughtTrapGame();
});

// Save settings before page unload
window.addEventListener('beforeunload', () => {
    if (window.game) {
        window.game.saveSettings();
    }
});