# JobMatch V1 User Stories

## Guest

### Browse public jobs

As a guest user,  
I want to search and browse available jobs,  
so that I can explore opportunities before creating an account.

Acceptance criteria:
- Guest users can access the Home page.
- Guest users can search for jobs.
- Guest users can view job results.
- Guest users can open job details.
- Guest users are not required to register before using the external Apply link.

### Understand locked features

As a guest user,  
I want to see which features require an account,  
so that I understand the value of registering.

Acceptance criteria:
- Match information is not shown to guests.
- Save Job actions prompt guests to register or log in.
- Company reviews are locked or blurred for guests.
- Locked sections include a clear registration or login prompt.

## Authentication

### Register an account

As a guest user,  
I want to register for an account,  
so that I can access personalized job features.

Acceptance criteria:
- A guest can navigate to registration from locked feature prompts.
- Successful registration creates a logged-in session.
- After registration, the user can access profile, saved jobs, reviews, and match information.

### Log in and log out

As a registered user,  
I want to log in and log out,  
so that I can securely access my personal JobMatch data.

Acceptance criteria:
- A registered user can log in with valid credentials.
- A logged-in user can log out.
- Authenticated-only pages and actions are unavailable after logout.

## Profile

### Complete profile manually

As a logged-in user,  
I want to complete my profile manually,  
so that JobMatch can show relevant match information.

Acceptance criteria:
- The profile includes name, email, preferred roles, skills, experience level, preferred work mode, preferred location, and languages.
- CV upload is not part of the V1 profile flow.
- AI CV parsing is not part of the V1 profile flow.
- The user can save profile changes.

### Edit profile

As a logged-in user,  
I want to edit my profile,  
so that my match information stays up to date.

Acceptance criteria:
- The user can open their Profile page.
- The user can edit each V1 profile field.
- Saved profile changes are reflected in future match displays.
- The frontend handles loading, error, and empty profile states.

## Job Search

### Search jobs

As a user,  
I want to start a job search from Home by keyword, role, or skill,  
so that I can find relevant roles efficiently.

Acceptance criteria:
- Guests and logged-in users can start a search from Home without choosing a location.
- The Home search carries the search term into Find Jobs.
- Users can view results after searching from Home.
- Filters support the confirmed V1 data fields.
- City/location filtering is available on Find Jobs.
- Province filtering is not included because the current data source does not reliably provide province-level information.
- The search experience includes loading, error, and empty states.

### Filter job results

As a user,  
I want to refine job results on Find Jobs,  
so that I can narrow results to jobs that fit my needs.

Acceptance criteria:
- Users can apply City/Location, Work type, Experience level, and sorting controls on Find Jobs.
- Filtered results update clearly.
- City/location filtering stays simple and does not use a geographic hierarchy.
- Empty filter results show a helpful empty state.

## Job Details

### View job details

As a user,  
I want to open a job details page,  
so that I can understand the role before applying.

Acceptance criteria:
- Guests and logged-in users can open job details.
- Job details show public job information.
- The external Apply link is available to all users.
- Authenticated-only sections are gated for guests.

### Apply externally

As a user,  
I want to open the external Apply link,  
so that I can apply through the employer or source website.

Acceptance criteria:
- Guests can use the external Apply link.
- Logged-in users can use the external Apply link.
- The frontend clearly treats apply as an external action.
- JobMatch does not claim to submit the application internally.

## Matching

### View match score

As a logged-in user,  
I want to see a match percentage on relevant jobs,  
so that I can quickly assess fit.

Acceptance criteria:
- Match percentage is shown only to logged-in users.
- Match percentage comes from Backend/Data.
- The frontend displays the match result without owning the main matching logic.
- Missing or unavailable match data is handled gracefully.

### Understand why a job matches

As a logged-in user,  
I want to see matched skills, missing skills, and a short explanation,  
so that I understand why a job is or is not a strong fit.

Acceptance criteria:
- Matched skills are displayed when provided.
- Missing skills are displayed when provided.
- A short match explanation is displayed when provided.
- Guests do not see personalized match details.

## Saved Jobs

### Save a job

As a logged-in user,  
I want to save jobs,  
so that I can return to interesting roles later.

Acceptance criteria:
- Only logged-in users can save jobs.
- A saved job has a visible saved state.
- Guests who try to save are prompted to register or log in.
- Save and unsave actions handle loading and error states.

### View saved jobs

As a logged-in user,  
I want to view my saved jobs,  
so that I can manage roles I am interested in.

Acceptance criteria:
- The Saved Jobs page requires authentication.
- Saved jobs are listed clearly.
- The user can open job details from saved jobs.
- Empty saved jobs show an empty state.

## Reviews

### View company reviews

As a logged-in user,  
I want to view company reviews,  
so that I can evaluate employers before applying.

Acceptance criteria:
- Full company reviews are available only to logged-in users.
- Reviews are shown on or from job details when review data is available.
- Missing review data shows an appropriate empty state.

### See locked reviews as a guest

As a guest user,  
I want to understand that company reviews exist,  
so that I have a reason to register.

Acceptance criteria:
- Guests can see that the reviews section exists.
- Review content is locked or blurred for guests.
- The locked reviews section includes a registration or login prompt.

## Application Tracking

### Manually track application status

As a logged-in user,  
I want to manually set my application status,  
so that I can track what happened after applying externally.

Acceptance criteria:
- Application tracking requires authentication.
- V1 supports Not applied, Applied, and Rejected statuses.
- Status can be changed manually by the user.
- Interview and Offer statuses are treated as later-version candidates unless confirmed for V1.
- Status updates handle loading and error states.
