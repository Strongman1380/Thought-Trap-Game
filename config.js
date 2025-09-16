// Configuration file for Thought Trap Escape
const GAME_CONFIG = {
    // Default game settings
    defaults: {
        gameMode: 'coop',
        timeLimit: 8, // minutes
        locksPerRound: 4,
        contentPack: 'default',
        maxTeams: 6,
        minTeams: 1
    },
    
    // Timer settings
    timer: {
        minTime: 6, // minutes
        maxTime: 12, // minutes
        warningThreshold: 60, // seconds - when to show warning
        criticalThreshold: 30, // seconds - when to show critical warning
        turnTimeLimit: 60, // seconds per turn in versus mode
        turnWarningThreshold: 20, // seconds - when to show turn warning
        turnCriticalThreshold: 10 // seconds - when to show turn critical warning
    },
    
    // Lock settings
    locks: {
        minLocks: 3,
        maxLocks: 5,
        difficultyTimeMultipliers: {
            easy: 1.2,
            medium: 1.0,
            hard: 0.8
        }
    },
    
    // Scoring system
    scoring: {
        basePoints: 1,
        speedBonus: {
            threshold: 30, // seconds
            bonus: 1
        },
        difficultyMultipliers: {
            easy: 1,
            medium: 1.5,
            hard: 2
        }
    },
    
    // UI settings
    ui: {
        animationDuration: 300, // milliseconds
        toastDuration: 5000, // milliseconds for key display
        modalFadeTime: 300, // milliseconds
        celebrationDuration: 1000 // milliseconds
    },
    
    // Accessibility settings
    accessibility: {
        highContrastRatio: 7, // WCAG AA compliance
        largeTextScale: 1.25,
        reducedMotionFallback: true,
        keyboardNavigationEnabled: true
    },
    
    // Local storage keys
    storage: {
        settings: 'thoughtTrapSettings',
        statistics: 'thoughtTrapStats',
        achievements: 'thoughtTrapAchievements'
    },
    
    // Achievement thresholds
    achievements: {
        speedDemon: 30, // seconds
        perfectRound: 1, // rounds
        teamPlayer: 1, // co-op wins
        champion: 3, // consecutive versus wins
        thoughtMaster: 50, // total solved locks
        keyCollector: 25 // keys collected in one pack
    },
    
    // Debug settings
    debug: {
        enabled: false,
        logLevel: 'info', // 'debug', 'info', 'warn', 'error'
        showTimers: false,
        skipAnimations: false
    },
    
    // Feature flags
    features: {
        achievements: true,
        statistics: true,
        soundEffects: false, // not implemented yet
        multiplayer: false, // not implemented yet
        customContent: false, // not implemented yet
        exportProgress: false // not implemented yet
    },
    
    // Content pack settings
    contentPacks: {
        default: {
            name: 'Core Thought Traps',
            description: 'Essential cognitive distortions everyone should know',
            difficulty: 'mixed',
            estimatedTime: '8-10 minutes'
        },
        social: {
            name: 'Social Situations',
            description: 'Thought traps that occur in social interactions',
            difficulty: 'medium',
            estimatedTime: '6-8 minutes'
        },
        school: {
            name: 'School & Learning',
            description: 'Academic and learning-related thought traps',
            difficulty: 'easy',
            estimatedTime: '6-8 minutes'
        }
    },
    
    // Validation rules
    validation: {
        teamName: {
            minLength: 1,
            maxLength: 20,
            allowedChars: /^[a-zA-Z0-9\s\-_]+$/
        },
        maxTeamNameLength: 20,
        requiredFields: ['teamName']
    },
    
    // Performance settings
    performance: {
        maxAnimationsPerSecond: 60,
        debounceTime: 300, // milliseconds for input debouncing
        throttleTime: 100 // milliseconds for scroll/resize events
    }
};

// Utility functions for configuration
const ConfigUtils = {
    // Get a configuration value with fallback
    get: function(path, fallback = null) {
        const keys = path.split('.');
        let current = GAME_CONFIG;
        
        for (const key of keys) {
            if (current && typeof current === 'object' && key in current) {
                current = current[key];
            } else {
                return fallback;
            }
        }
        
        return current;
    },
    
    // Validate game settings
    validateSettings: function(settings) {
        const errors = [];
        
        // Validate time limit
        if (settings.timeLimit < this.get('timer.minTime') || 
            settings.timeLimit > this.get('timer.maxTime')) {
            errors.push(`Time limit must be between ${this.get('timer.minTime')} and ${this.get('timer.maxTime')} minutes`);
        }
        
        // Validate locks per round
        if (settings.locksPerRound < this.get('locks.minLocks') || 
            settings.locksPerRound > this.get('locks.maxLocks')) {
            errors.push(`Locks per round must be between ${this.get('locks.minLocks')} and ${this.get('locks.maxLocks')}`);
        }
        
        // Validate team count
        if (settings.teams.length < this.get('defaults.minTeams') || 
            settings.teams.length > this.get('defaults.maxTeams')) {
            errors.push(`Number of teams must be between ${this.get('defaults.minTeams')} and ${this.get('defaults.maxTeams')}`);
        }
        
        // Validate team names
        settings.teams.forEach((team, index) => {
            const nameRegex = this.get('validation.teamName.allowedChars');
            if (!nameRegex.test(team.name)) {
                errors.push(`Team ${index + 1} name contains invalid characters`);
            }
            
            if (team.name.length > this.get('validation.maxTeamNameLength')) {
                errors.push(`Team ${index + 1} name is too long (max ${this.get('validation.maxTeamNameLength')} characters)`);
            }
        });
        
        return errors;
    },
    
    // Get default settings
    getDefaults: function() {
        return { ...this.get('defaults') };
    },
    
    // Check if a feature is enabled
    isFeatureEnabled: function(featureName) {
        return this.get(`features.${featureName}`, false);
    },
    
    // Get achievement threshold
    getAchievementThreshold: function(achievementName) {
        return this.get(`achievements.${achievementName}`, 0);
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GAME_CONFIG, ConfigUtils };
}