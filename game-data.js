// Game Data for Thought Trap Escape
const GAME_DATA = {
    thoughtTraps: {
        default: [
            {
                id: 1,
                title: "All-or-Nothing Thinking",
                description: "You see everything as either perfect or terrible. If something isn't completely right, you think it's a total failure.",
                example: "I got a B+ on my test, so I'm terrible at math.",
                tags: ["school", "perfectionism"],
                difficulty: "easy"
            },
            {
                id: 2,
                title: "Overgeneralization",
                description: "You take one bad thing that happens and think it will keep happening forever.",
                example: "I didn't get the job, so I'll never find work.",
                tags: ["work", "career"],
                difficulty: "easy"
            },
            {
                id: 3,
                title: "Mental Filter",
                description: "You focus only on the bad parts and ignore all the good things.",
                example: "Despite receiving mostly positive feedback, you focus only on one criticism.",
                tags: ["work", "relationships"],
                difficulty: "medium"
            },
            {
                id: 4,
                title: "Disqualifying the Positive",
                description: "You ignore or explain away anything good that happens to you.",
                example: "They only said I did well to be nice.",
                tags: ["relationships", "self-esteem"],
                difficulty: "medium"
            },
            {
                id: 5,
                title: "Jumping to Conclusions",
                description: "You make up negative stories in your head without any real proof.",
                example: "My friend didn't text back immediately, so they must be mad at me.",
                tags: ["relationships", "social"],
                difficulty: "easy"
            },
            {
                id: 6,
                title: "Mind Reading",
                description: "You think you know what others are thinking about you, but you're just guessing.",
                example: "I can tell my boss thinks I'm incompetent.",
                tags: ["work", "relationships"],
                difficulty: "medium"
            },
            {
                id: 7,
                title: "Fortune Telling",
                description: "You predict that bad things will happen and believe your prediction is already true.",
                example: "I know I'm going to fail this presentation.",
                tags: ["work", "school", "anxiety"],
                difficulty: "medium"
            },
            {
                id: 8,
                title: "Magnification or Minimization",
                description: "You make small problems seem huge, or you make big successes seem small.",
                example: "This mistake will ruin my entire career (magnification) or My success was just luck (minimization).",
                tags: ["work", "self-esteem"],
                difficulty: "hard"
            },
            {
                id: 9,
                title: "Emotional Reasoning",
                description: "You think your feelings prove that something is true, even when they're not.",
                example: "I feel guilty, so I must have done something wrong.",
                tags: ["emotions", "self-awareness"],
                difficulty: "hard"
            },
            {
                id: 10,
                title: "Should Statements",
                description: "You tell yourself you 'should' or 'must' do things perfectly, which makes you feel bad when you don't.",
                example: "I should be able to handle this without getting stressed.",
                tags: ["perfectionism", "self-criticism"],
                difficulty: "medium"
            },
            {
                id: 11,
                title: "Labeling and Mislabeling",
                description: "Instead of saying you made a mistake, you call yourself a bad name.",
                example: "I'm an idiot instead of I made a mistake.",
                tags: ["self-esteem", "self-criticism"],
                difficulty: "easy"
            },
            {
                id: 12,
                title: "Personalization",
                description: "You blame yourself for things that aren't really your fault.",
                example: "My team lost because I didn't try hard enough (when you played well).",
                tags: ["responsibility", "guilt"],
                difficulty: "hard"
            },
            {
                id: 13,
                title: "Catastrophizing",
                description: "You imagine the worst thing that could happen and act like it's definitely going to occur.",
                example: "If I don't get this promotion, my career is over.",
                tags: ["anxiety", "work"],
                difficulty: "medium"
            },
            {
                id: 14,
                title: "Comparison Trap",
                description: "You constantly compare yourself to others and always feel like you're coming up short.",
                example: "Everyone else seems so confident and successful compared to me.",
                tags: ["social", "self-esteem"],
                difficulty: "easy"
            },
            {
                id: 15,
                title: "Perfectionism",
                description: "You set impossibly high standards and feel like a failure when you don't reach them.",
                example: "If I can't do it perfectly, there's no point in trying.",
                tags: ["perfectionism", "procrastination"],
                difficulty: "medium"
            }
        ],
        social: [
            {
                id: 16,
                title: "Social Mind Reading",
                description: "You think you know what others are thinking about you in social situations, but you're just guessing.",
                example: "Everyone at the party thinks I'm boring.",
                tags: ["social", "anxiety"],
                difficulty: "medium"
            },
            {
                id: 17,
                title: "Spotlight Effect",
                description: "You believe everyone is watching and judging your every move, when they're not.",
                example: "Everyone noticed that I spilled coffee on my shirt.",
                tags: ["social", "self-consciousness"],
                difficulty: "easy"
            },
            {
                id: 18,
                title: "Social Comparison",
                description: "You constantly compare your social life and relationships to other people's.",
                example: "I don't have as many friends as Sarah does.",
                tags: ["social", "relationships"],
                difficulty: "easy"
            },
            {
                id: 19,
                title: "Rejection Sensitivity",
                description: "You take normal social situations and turn them into signs that people don't like you.",
                example: "They didn't invite me because they don't like me (when it was a small gathering).",
                tags: ["social", "relationships"],
                difficulty: "medium"
            },
            {
                id: 20,
                title: "Social Perfectionism",
                description: "You think you have to be perfect in social situations and never make mistakes.",
                example: "I can't believe I said something awkward - now they'll never want to hang out with me.",
                tags: ["social", "perfectionism"],
                difficulty: "hard"
            }
        ],
        school: [
            {
                id: 21,
                title: "Grade Catastrophizing",
                description: "You think one bad grade means your whole school life is ruined.",
                example: "I got a C on this test, so I'll never get into college.",
                tags: ["school", "anxiety"],
                difficulty: "easy"
            },
            {
                id: 22,
                title: "Comparison to Classmates",
                description: "You constantly compare your grades and performance to other students.",
                example: "Everyone else understands this better than I do.",
                tags: ["school", "comparison"],
                difficulty: "easy"
            },
            {
                id: 23,
                title: "Academic Mind Reading",
                description: "You think your teachers have negative opinions about you based on little evidence.",
                example: "My teacher thinks I'm not smart enough for this class.",
                tags: ["school", "relationships"],
                difficulty: "medium"
            },
            {
                id: 24,
                title: "Study Perfectionism",
                description: "You think you have to understand everything perfectly before you can move forward.",
                example: "I can't start the next chapter until I've mastered this one completely.",
                tags: ["school", "perfectionism"],
                difficulty: "medium"
            },
            {
                id: 25,
                title: "Test Anxiety Spiral",
                description: "You predict you'll fail tests and let your worry make it harder to do well.",
                example: "I'm going to blank out on the test and fail.",
                tags: ["school", "anxiety"],
                difficulty: "hard"
            }
        ]
    },
    
    keys: {
        default: [
            {
                id: 1,
                thoughtTrapId: 1,
                title: "Shades of Gray",
                description: "Look for the middle ground between perfect and terrible. Most situations exist on a spectrum.",
                technique: "Rate your performance on a scale of 1-10 instead of pass/fail."
            },
            {
                id: 2,
                thoughtTrapId: 2,
                title: "Specific Evidence",
                description: "Look for real facts instead of making big generalizations from one event.",
                technique: "Ask: 'What evidence do I have that this will always happen?'"
            },
            {
                id: 3,
                thoughtTrapId: 3,
                title: "Balanced Perspective",
                description: "Actively look for good things and consider the whole picture, not just the bad parts.",
                technique: "List three positive things for every negative thing you notice."
            },
            {
                id: 4,
                thoughtTrapId: 4,
                title: "Accept Compliments",
                description: "Practice accepting good feedback as real instead of explaining it away.",
                technique: "When someone compliments you, simply say 'thank you' instead of explaining it away."
            },
            {
                id: 5,
                thoughtTrapId: 5,
                title: "Check the Facts",
                description: "Before making up negative stories, gather more information or ask directly.",
                technique: "Ask yourself: 'What other explanations could there be?'"
            },
            {
                id: 6,
                thoughtTrapId: 6,
                title: "Reality Check",
                description: "Test your guesses by asking for feedback or watching what actually happens.",
                technique: "Ask: 'How do I actually know what they're thinking?'"
            },
            {
                id: 7,
                thoughtTrapId: 7,
                title: "Present Focus",
                description: "Focus on what you can control right now instead of predicting bad futures.",
                technique: "Ask: 'What can I do today to prepare?' instead of 'What if I fail?'"
            },
            {
                id: 8,
                thoughtTrapId: 8,
                title: "Realistic Sizing",
                description: "Put things in perspective by thinking about how important they really are.",
                technique: "Ask: 'Will this matter in 5 years?' or 'How important is this really?'"
            },
            {
                id: 9,
                thoughtTrapId: 9,
                title: "Feelings vs Facts",
                description: "Remember that feelings aren't facts. Just because you feel something doesn't make it true.",
                technique: "Ask: 'What evidence supports this feeling?' and 'What evidence contradicts it?'"
            },
            {
                id: 10,
                thoughtTrapId: 10,
                title: "Flexible Thinking",
                description: "Replace 'should' statements with more flexible preferences and realistic expectations.",
                technique: "Replace 'I should' with 'I would prefer' or 'It would be nice if.'"
            },
            {
                id: 11,
                thoughtTrapId: 11,
                title: "Describe Don't Label",
                description: "Describe your actions or mistakes without calling yourself bad names.",
                technique: "Say 'I made a mistake' instead of 'I'm stupid.'"
            },
            {
                id: 12,
                thoughtTrapId: 12,
                title: "Responsibility Reality",
                description: "Consider all the factors that led to a situation, not just your role.",
                technique: "List all the factors that contributed to the outcome, including those outside your control."
            },
            {
                id: 13,
                thoughtTrapId: 13,
                title: "Probability Check",
                description: "Think about how likely your worst-case scenario really is.",
                technique: "Ask: 'What's the most likely outcome?' and 'How often does the worst case actually happen?'"
            },
            {
                id: 14,
                thoughtTrapId: 14,
                title: "Your Own Journey",
                description: "Focus on your own progress and goals instead of comparing to others.",
                technique: "Compare yourself to who you were yesterday, not to other people."
            },
            {
                id: 15,
                thoughtTrapId: 15,
                title: "Good Enough",
                description: "Set realistic standards and accept that 'good enough' is often perfectly fine.",
                technique: "Ask: 'What would be good enough in this situation?' and aim for that."
            },
            {
                id: 16,
                thoughtTrapId: 16,
                title: "Social Reality Check",
                description: "Remember that most people are focused on themselves, not judging you.",
                technique: "Ask a trusted friend what they actually think, or observe people's actual reactions."
            },
            {
                id: 17,
                thoughtTrapId: 17,
                title: "Attention Reality",
                description: "Remember that people notice far less about you than you think they do.",
                technique: "Think about how much you notice about others' minor mistakes or appearance."
            },
            {
                id: 18,
                thoughtTrapId: 18,
                title: "Unique Path",
                description: "Remember that everyone has different circumstances, strengths, and challenges.",
                technique: "Focus on what makes you happy in relationships rather than quantity or comparison."
            },
            {
                id: 19,
                thoughtTrapId: 19,
                title: "Alternative Explanations",
                description: "Consider other reasons why someone might act a certain way that have nothing to do with rejecting you.",
                technique: "List 3 alternative explanations for someone's behavior before assuming rejection."
            },
            {
                id: 20,
                thoughtTrapId: 20,
                title: "Social Imperfection",
                description: "Accept that social mistakes are normal and don't define your worth or relationships.",
                technique: "Remember a time when someone else made a social mistake - did it change how you felt about them?"
            },
            {
                id: 21,
                thoughtTrapId: 21,
                title: "Grade Perspective",
                description: "Remember that one grade is just one small part of your overall school journey.",
                technique: "Look at your overall grade pattern and consider what this one grade actually means for your future."
            },
            {
                id: 22,
                thoughtTrapId: 22,
                title: "Personal Progress",
                description: "Focus on your own learning and improvement rather than comparing to classmates.",
                technique: "Track your own progress over time instead of comparing to others."
            },
            {
                id: 23,
                thoughtTrapId: 23,
                title: "Teacher Reality",
                description: "Remember that teachers want their students to succeed and aren't constantly judging you.",
                technique: "Consider asking your teacher for feedback or help - their response will give you real information."
            },
            {
                id: 24,
                thoughtTrapId: 24,
                title: "Learning Process",
                description: "Accept that learning is a process and you don't need to master everything right away.",
                technique: "Set a time limit for studying each topic and move on, trusting that understanding will develop over time."
            },
            {
                id: 25,
                thoughtTrapId: 25,
                title: "Test Preparation",
                description: "Focus on preparing and trying your best rather than predicting results.",
                technique: "Create a study plan and focus on what you can control - your preparation - rather than the test result."
            }
        ],
        social: [
            // Keys for social thought traps (16-20) are included in the default keys array above
        ],
        school: [
            // Keys for school thought traps (21-25) are included in the default keys array above
        ]
    },
    
    // Difficulty settings
    difficulty: {
        easy: { timeMultiplier: 1.2, hintAvailable: true },
        medium: { timeMultiplier: 1.0, hintAvailable: true },
        hard: { timeMultiplier: 0.8, hintAvailable: false }
    },
    
    // Team colors with their corresponding CSS classes and display colors
    teamColors: {
        blue: { class: 'team-blue', display: 'Blue', color: '#3b82f6' },
        red: { class: 'team-red', display: 'Red', color: '#ef4444' },
        green: { class: 'team-green', display: 'Green', color: '#10b981' },
        purple: { class: 'team-purple', display: 'Purple', color: '#8b5cf6' },
        yellow: { class: 'team-yellow', display: 'Yellow', color: '#f59e0b' },
        pink: { class: 'team-pink', display: 'Pink', color: '#ec4899' }
    },
    
    // Achievement system
    achievements: {
        speedDemon: { name: "Speed Demon", description: "Solve a lock in under 30 seconds", icon: "⚡" },
        perfectRound: { name: "Perfect Round", description: "Solve all locks in a round", icon: "🎯" },
        teamPlayer: { name: "Team Player", description: "Win a co-op game", icon: "🤝" },
        champion: { name: "Champion", description: "Win 3 versus games in a row", icon: "🏆" },
        thoughtMaster: { name: "Thought Master", description: "Solve 50 thought traps", icon: "🧠" },
        keyCollector: { name: "Key Collector", description: "Collect all keys in a content pack", icon: "🗝️" }
    }
};

// Utility functions for game data
const GameDataUtils = {
    // Get thought traps for a specific content pack, filtered by excluded tags
    getThoughtTraps: function(contentPack = 'default', excludedTags = [], count = 4) {
        let traps = [...GAME_DATA.thoughtTraps[contentPack]];
        
        // Filter out excluded tags
        if (excludedTags.length > 0) {
            traps = traps.filter(trap => 
                !trap.tags.some(tag => excludedTags.includes(tag))
            );
        }
        
        // Shuffle and return requested count
        return this.shuffleArray(traps).slice(0, count);
    },
    
    // Get the key for a specific thought trap
    getKey: function(thoughtTrapId) {
        return GAME_DATA.keys.default.find(key => key.thoughtTrapId === thoughtTrapId);
    },
    
    // Shuffle array utility
    shuffleArray: function(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },
    
    // Get random thought traps across all content packs
    getMixedThoughtTraps: function(excludedTags = [], count = 4) {
        let allTraps = [];
        Object.values(GAME_DATA.thoughtTraps).forEach(pack => {
            allTraps = allTraps.concat(pack);
        });
        
        // Filter out excluded tags
        if (excludedTags.length > 0) {
            allTraps = allTraps.filter(trap => 
                !trap.tags.some(tag => excludedTags.includes(tag))
            );
        }
        
        return this.shuffleArray(allTraps).slice(0, count);
    },
    
    // Get difficulty settings
    getDifficultySettings: function(difficulty) {
        return GAME_DATA.difficulty[difficulty] || GAME_DATA.difficulty.medium;
    },
    
    // Get team color information
    getTeamColor: function(colorName) {
        return GAME_DATA.teamColors[colorName] || GAME_DATA.teamColors.blue;
    }
};