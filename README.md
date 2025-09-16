# Thought Trap Escape

A web-based educational game designed to help players identify and overcome cognitive distortions (thought traps) through an engaging escape room format.

## Overview

Thought Trap Escape combines mental health education with gamification, helping players learn to recognize common cognitive distortions and develop healthier thinking patterns. Players work individually or in teams to "unlock" thought traps by understanding them and learning the corresponding coping strategies (keys).

## Features

### Game Modes
- **Co-op Mode**: Teams work together to solve all locks
- **Versus Mode**: Teams compete to solve the most locks

### Customization Options
- Adjustable round time (6-12 minutes)
- Variable number of locks per round (3-5)
- Multiple content packs (Core, Social Situations, School & Learning)
- Content filtering by tags (School, Family, Work, Relationships)

### Accessibility Features
- High contrast mode
- Large text option
- Reduced motion settings
- Keyboard navigation support

### Educational Content
- 25+ thought traps across different categories
- Corresponding "keys" (coping strategies) for each thought trap
- Real-world examples and practical techniques
- Difficulty levels (Easy, Medium, Hard)

## How to Play

1. **Setup**: Configure teams, game mode, time limit, and content preferences
2. **Game Start**: Teams are presented with a grid of "locks" (thought traps)
3. **Unlock Process**: Click on a lock to read about the thought trap
4. **Learn**: Understand the thought trap and mark it as "solved"
5. **Key Collection**: Receive the corresponding coping strategy (key)
6. **Win Condition**: Solve all locks before time runs out (co-op) or solve the most locks (versus)

## File Structure

```
/
├── index.html          # Main HTML file with game interface
├── styles.css          # Custom CSS styles and animations
├── game-data.js        # Thought traps, keys, and game content
├── game-logic.js       # Main game logic and state management
└── README.md          # This documentation file
```

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Custom animations, responsive design, accessibility modes
- **JavaScript (ES6+)**: Game logic, state management, DOM manipulation
- **Tailwind CSS**: Utility-first CSS framework for rapid styling

### Browser Compatibility
- Modern browsers supporting ES6+ features
- Responsive design for desktop and mobile devices
- Progressive enhancement for accessibility features

### Performance Considerations
- Efficient DOM manipulation
- Optimized animations with CSS transforms
- Local storage for settings persistence
- Minimal external dependencies

## Educational Framework

### Cognitive Distortions Covered
1. **All-or-Nothing Thinking**: Black and white categorization
2. **Overgeneralization**: Single events as never-ending patterns
3. **Mental Filter**: Dwelling on negative details exclusively
4. **Disqualifying the Positive**: Rejecting positive experiences
5. **Jumping to Conclusions**: Negative interpretations without facts
6. **Mind Reading**: Assuming others' negative thoughts
7. **Fortune Telling**: Predicting negative outcomes
8. **Magnification/Minimization**: Exaggerating or shrinking importance
9. **Emotional Reasoning**: Feelings as facts
10. **Should Statements**: Unrealistic expectations
11. **Labeling**: Negative self-labels instead of describing actions
12. **Personalization**: Taking responsibility for external events
13. **Catastrophizing**: Imagining worst-case scenarios
14. **Comparison Trap**: Measuring against others
15. **Perfectionism**: Unrealistically high standards

### Coping Strategies (Keys)
Each thought trap has a corresponding "key" that provides:
- **Recognition technique**: How to identify the thought trap
- **Reframing method**: Alternative ways to think about the situation
- **Practical exercise**: Actionable steps to practice the new thinking pattern

## Customization and Extension

### Adding New Content
1. **Thought Traps**: Add new entries to `GAME_DATA.thoughtTraps` in `game-data.js`
2. **Keys**: Add corresponding coping strategies to `GAME_DATA.keys`
3. **Content Packs**: Create new themed collections of thought traps

### Styling Customization
- Modify `styles.css` for visual changes
- Update Tailwind classes in HTML for layout adjustments
- Add new team colors in `GAME_DATA.teamColors`

### Feature Extensions
- Achievement system (partially implemented)
- Statistics tracking (basic implementation included)
- Multiplayer networking capabilities
- Progress saving and user accounts
- Additional game modes

## Accessibility Compliance

The game includes several accessibility features:
- **WCAG 2.1 AA compliance** for color contrast and text sizing
- **Keyboard navigation** support for all interactive elements
- **Screen reader compatibility** with semantic HTML and ARIA labels
- **Reduced motion** options for users with vestibular disorders
- **High contrast mode** for users with visual impairments

## Installation and Setup

1. Clone or download the repository
2. Open `index.html` in a modern web browser
3. No build process or server required - runs entirely client-side

## Development

### Local Development
- No build tools required
- Edit files directly and refresh browser
- Use browser developer tools for debugging

### Testing
- Test across different browsers and devices
- Verify accessibility features with screen readers
- Check responsive design at various screen sizes

## Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Areas for Contribution
- Additional thought traps and coping strategies
- New game modes or mechanics
- Improved accessibility features
- Performance optimizations
- Bug fixes and improvements

## License

This project is designed for educational purposes. Please ensure any use complies with applicable educational and mental health guidelines.

## Disclaimer

This game is designed for educational purposes and should not be considered a substitute for professional mental health treatment. If you're experiencing persistent negative thoughts or mental health concerns, please consult with a qualified mental health professional.

## Support

For questions, suggestions, or issues, please refer to the project's issue tracker or contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Compatibility**: Modern browsers with ES6+ support