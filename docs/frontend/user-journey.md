# JobMatch V1 User Journey

This document describes the intended V1 product journey for guest and logged-in users. The goal is to make the main decision points clear before detailed frontend implementation begins.

V1 uses keyword search on Home, then city/location refinement on Find Jobs. Province filtering is not included because the current data source does not reliably provide province-level information.

## Main Journey

```mermaid
flowchart TD
  A[Home] --> B[Keyword or Role Search]
  B --> C[Find Jobs]
  C --> D[City or Location Filter]
  D --> E[Other Filters and Sorting]
  E --> F[Job Results]
  F --> G[Job Details]

  G --> H[External Apply]
  H --> I[Apply on External Website]

  G --> J{User logged in?}
  J -- No --> K[Show public job details]
  K --> L[Reviews visible but locked]
  K --> M[Hide personalized match information]
  K --> N[Prompt to Register or Log In]

  J -- Yes --> O[Show match score]
  O --> P[Show matched skills]
  O --> Q[Show missing skills]
  O --> R[Show short match explanation]
  G --> S[Save Job]
  G --> T[View company reviews]
  G --> U[Update manual application status]

  N --> V[Register or Log In]
  V --> W[Logged-in Experience]
  W --> O
  W --> S
  W --> T
  W --> U
```

## Guest Journey

```mermaid
flowchart TD
  A[Home] --> B[Search by keyword, role, or skill]
  B --> C[Find Jobs]
  C --> D[Select city or location]
  D --> E[Apply other filters and sorting]
  E --> F[View job results]
  F --> G[Open job details]
  G --> H[Use external Apply link]
  G --> I[See locked reviews section]
  G --> J[See Register or Log In prompt]
  J --> K{Register or log in?}
  K -- Yes --> L[Continue as logged-in user]
  K -- No --> F
```

Guests can browse jobs and apply externally. They cannot save jobs, see personalized match information, see full company reviews, or use profile-based personalization.

## Logged-In Journey

```mermaid
flowchart TD
  A[Log in] --> B{Profile complete?}
  B -- No --> C[Complete profile manually]
  C --> D[Search jobs]
  B -- Yes --> D[Search jobs]

  D --> E[View results]
  E --> F[Open job details]
  F --> G[View match score]
  G --> H[Review matched and missing skills]
  G --> I[Read match explanation]

  F --> J[Save job]
  J --> K[View Saved Jobs]
  K --> F

  F --> L[Open external Apply link]
  L --> M[Return to JobMatch]
  M --> N[Set manual application status]
  N --> O[Not applied, Applied, or Rejected]

  F --> P[View company reviews]
  A --> Q[Open Profile]
  Q --> R[Edit profile]
  R --> D
```

Logged-in users can complete and edit their profile manually, see match information, save jobs, view saved jobs, access company reviews, and manually track application status.

## Profile Flow

```mermaid
flowchart TD
  A[Open Profile] --> B[View profile details]
  B --> C[Edit profile]
  C --> D[Update name and email]
  C --> E[Update preferred roles]
  C --> F[Update skills]
  C --> G[Update experience level]
  C --> H[Update work mode]
  C --> I[Update preferred location]
  C --> J[Update languages]
  D --> K[Save profile]
  E --> K
  F --> K
  G --> K
  H --> K
  I --> K
  J --> K
  K --> L[Profile used for match display]
```

CV upload and AI CV parsing are outside V1. Profile completion is manual only.

## Key Decision Points

- The user may browse as a guest or register/log in for personalized features.
- Match information appears only for logged-in users with enough profile data.
- Saving jobs requires authentication.
- Company reviews are available only to logged-in users.
- Apply always sends the user to an external application page.
- Application status is tracked manually inside JobMatch after external apply.
