# JobMatch V1 Frontend Flow Notes

## Public Pages

- Home
- Job search
- Job results
- Job details
- Register
- Login

Public users can start a keyword search from Home, refine by city/location on Find Jobs, browse results, open job details, and use the external Apply link.

## Authentication Required

- Profile
- Edit Profile
- Saved Jobs
- Save Job action
- Match score
- Match explanation
- Matched skills
- Missing skills
- Full company reviews
- Manual application status tracking

Guests should be prompted to register or log in when they try to access authenticated features.

## Backend Dependencies

- Authentication state and session handling
- Register, login, and logout behavior
- User profile read and update
- Saved jobs read, create, and remove
- Manual application status read and update
- Job search API behavior
- Job details retrieval
- Company review access control
- Match result retrieval

## Data Dependencies

- Job records and required public job fields
- External Apply URLs
- Company review data
- Match score data
- Matched skills
- Missing skills
- Match explanation text
- Supported filters
- City/location values supported by the current job data source

## Location Decision

Home is a simple keyword, role, or skill search entry point. City/location filtering happens on Find Jobs only. Province filtering is not included because the current data source does not reliably provide province-level information.

## Frontend Responsibilities

- Display public job search, results, and job details.
- Gate authenticated-only features in the UI.
- Show locked or blurred company reviews for guests.
- Display match information received from Backend/Data.
- Provide manual profile forms for V1 profile fields.
- Provide saved job states and interactions for logged-in users.
- Provide manual application status controls for logged-in users.
- Handle loading, error, and empty states across V1 flows.

## Not Frontend Responsibilities

- Main matching logic
- AI CV parsing
- Automatic profile extraction from CV
- Internal application submission to employers
- Review data generation

## Uncertain Product Decisions

- Final V1 filter list.
- Whether manual application status should include only Not applied, Applied, and Rejected, or also Interview and Offer.
- Whether match information appears in results, job details, or both.
- Minimum profile completeness required before showing match information.
- How much company review preview should be visible to guests before registration.
- Exact post-registration destination: Profile completion, previous job details page, or general dashboard.

## Important Edge Cases

- Guest tries to save a job.
- Guest opens a locked company reviews section.
- Guest registers from a job details page and should continue smoothly.
- Logged-in user has an incomplete profile.
- Logged-in user has no saved jobs.
- Search returns no results.
- Filters produce no results.
- Match data is missing or delayed.
- Company review data is unavailable.
- External Apply URL is missing or invalid.
- Application status update fails.
- Profile save fails.
