🎮 ImpactQuest: Gamified LFA Design Engine

Democratizing Program Design for 1 Million Public Schools.

ImpactQuest is a digital, gamified "Design Engine" built to help NGOs and CSOs navigate the complexities of program design in the Indian public education sector. By converting the Shikshagraha Common Logical Framework Approach (LFA) into an interactive 5-level quest, we reduce human design effort by 60% and ensure rigorous, systems-level impact.

🚀 The Problem

Most education-focused NGOs face "Blank Page Syndrome" when designing programs. The current process is:

🐌 Slow: Takes weeks of back-and-forth reviews.

💰 Expensive: Dependent on high-level expert consultants.

🧩 Fragmented: Often fails to link everyday activities to systemic change.

🛠️ The Solution

ImpactQuest acts as the "TurboTax for Program Design." It guides teams through a structured journey, validated in real-time by Gemini 1.5 Flash, to ensure that every program is logically sound, stakeholder-aligned, and ready for implementation.

🗺️ The 5-Level Quest Journey

Level 1: The Anchor ⚓
Define the core problem and the primary student-level outcome (e.g., FLN proficiency).

Level 2: The Blueprint 📜
Select evidence-based methodologies (FLN, Career Readiness, Leadership).

Level 3: The Alliance 🤝
Map the stakeholder hierarchy—from Teachers and HMs to BEOs and DIET officials.

Level 4: The Shift 🔄
Articulate specific practice changes for every actor in the system.

Level 5: The Pulse 💓
Select verified indicators and measurement tools to track success.

🧠 The AI Engine: Logic Validator

ImpactQuest is powered by Google AI Studio and Gemini 1.5 Flash.

Real-time Logic Checks: The AI identifies "Logic Gaps" (e.g., if you have a student goal but no corresponding teacher training).

Contextual Suggestions: Provides localized terminology (CRP, BRP, BRCC) and theme-specific indicators.

Vibe-to-JSON: Converts natural language ideas into structured LFA data.

💻 Tech Stack

AI Brain: Google AI Studio & Gemini 1.5 Flash

Frontend: React.js + Vite

Styling: Tailwind CSS + Framer Motion (for gamified animations)

Version Control & Persistence: GitHub API (Automated LFA export)

Deployment: Vercel

📦 Installation & Setup

Clone the repo:

git clone [https://github.com/your-username/impactquest.git](https://github.com/your-username/impactquest.git)
cd impactquest


Install dependencies:

npm install


Set up environment variables:
Create a .env file in the root directory:

VITE_GEMINI_API_KEY=your_google_ai_studio_key
VITE_GITHUB_TOKEN=your_personal_access_token


Run the development server:

npm run dev


📈 Impact & Scalability

Interoperability: Generates standardized JSON files compatible with Shikshagraha’s ecosystem.

Theme Agnostic: While launched with FLN, the engine can be updated via JSON templates to support Climate Education, Health, or Vocational training.

Empowerment: Shifts program design capability from elite consultants to grassroots field implementation teams.

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

Built with ❤️ for the Shikshagraha Buildathon.
