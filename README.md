# AdaptLearn: AI-Adaptive Study Interface

AdaptLearn is a web-based adaptive study interface created for the MSAI 631 Adaptive UI Using AI/HCI Project at the University of the Cumberlands.

## Purpose

The project demonstrates how a user interface can adapt dynamically based on a user's interactions and learning performance.

AdaptLearn maintains a simple user model using:

- Number of questions answered
- Number of correct answers
- Accuracy
- Number of hints requested

Based on these interaction signals, the system adapts the interface during runtime.

## Adaptive Modes

### Standard Mode
The default interface provides standard-difficulty questions and a balanced level of assistance.

### Support Mode
When the system detects low performance or repeated use of hints, it provides:

- Easier questions
- More prominent assistance
- Larger interface text
- A visually emphasized question area
- More accessible hints

### Challenge Mode
When the system detects strong performance without assistance, it provides:

- Advanced questions
- Less prominent hints
- A visually distinct interface
- Reduced assistance

## Transparency

AdaptLearn explains why the interface has changed whenever an adaptation occurs. Users can also reset the adaptive model at any time.

## Technologies

- HTML
- CSS
- JavaScript

No external libraries or APIs are required.

## Running the Project

1. Download or clone the repository.
2. Open `index.html` in a modern web browser.
3. Answer questions and interact with the hint feature.
4. Observe how the interface adapts based on performance.

## AI Assistance Disclosure

ChatGPT was used as a development-support and guidance tool during the planning and coding of this project. The application was implemented, tested, and evaluated by the student.

## Author

Katharina Bopst  
MSAI 631  
University of the Cumberlands