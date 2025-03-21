# Momentum - Progress Tracking Software

Momentum is a **Progress Tracking** application where **Redberry** can manage employees and their delegated tasks efficiently.

## Technologies Used

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**

## Features

### Task List Page (Dashboard)

- Displays all tasks in a **dashboard-style** layout.
- Tasks are categorized into **4 status columns**:
  - To Start
  - In Progress
  - Ready for Testing
  - Completed
- Each task card contains:
  - Task Title
  - Short Description with ellipsis for longer texts
  - Priority Icon (High, Medium, Low)
  - Due Date
  - Department Name
  - Responsible Employee’s Image

#### Filtering Options

- **Department Filter** (Multi-select)
- **Priority Filter** (Multi-select)
- **Employee Filter** (Single-select with name, surname, and avatar)
- Filtering is applied **client-side** and persists after page refresh.
- Multiple filters work together (e.g., **HR Department & Medium Priority** tasks will show only matching tasks).

---

### Task Details Page

- Displays **full task information**, including:
  - Title, Description, Priority
  - Responsible Employee's **Name, Surname, Image, and Department**
  - Due Date
- Users can **update the task status** directly.

#### Comments Section

- **Text area** for adding comments (real-time validation: cannot be empty or contain only spaces).
- **Reply button** to respond to a comment (only 1 level of replies allowed).
- New comments appear at the **top of the list**.

---

### Task Creation Page

Users can create new tasks with the following fields:

- **Title (required)**: 3-255 characters
- **Description (optional)**: Min 4 words, max 255 characters
- **Priority (required)**: High / Medium (default) / Low (API-based options)
- **Status (required)**: To Start (default) / In Progress / Ready for Testing / Completed (API-based options)
- **Department (required)**: API-based options
  - **Employee field appears only after department selection.**
- **Responsible Employee (required)**: API-based options
  - Dropdown includes an **"Add New Employee"** button to open the employee creation modal.
- **Due Date (required)**:
  - Default: **Tomorrow’s date**
  - Cannot be a past date

#### Real-Time Validation

- **Error messages appear while typing.**
- The submit button is **disabled** until all validations pass.
- After successful submission:
  - Redirect to the **Task List Page**.
  - Newly created task appears **immediately**.
- Page **does not lose data** on refresh, only resets after successful submission.
- Changing **department resets selected employee**.

---

### Employee Creation Modal

- Accessible from **navigation and task creation page**.
- Can be **closed** using the **close button** or by clicking outside the modal.
- Fields:
  - **First Name (required)**: 2-255 characters (Georgian/Latin only, no numbers/special characters)
  - **Last Name (required)**: 2-255 characters (Georgian/Latin only, no numbers/special characters)
  - **Avatar (required)**:
    - Image file only
    - Max size **600KB**
    - Preview of uploaded image with **delete option**
  - **Department (required)**: API-based options
- Form resets on modal close (data is **not stored** on refresh).
- **Real-time validation** applied.

---

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/elenetskitishvili/momentum
   cd momentum
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the project in the browser:
   ```
   http://localhost:3000
   ```

## Notes

- **Validation is real-time.**
- **Filtering happens on the frontend and persists on refresh.**
- **Tasks & comments are updated dynamically without page reloads.**
