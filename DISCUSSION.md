## Improvements: 
The following are the things that I have done to improve the advocate search experience.

-  Normalize specialties so that it is easier to search/filter and maintain over time.
-  Added a loading state/experience to the table.
-  Added a model layer to the project to handle the data and API calls
-  Used zod to validate the API responses
-  Added a separate advocate table component that can be used in other pages
-  Added server side filtering for the advocate API to improve performance at volume/scale.
-  Debounced the filter updates
-  Made the filter input a controlled input
-  Added some basic styling to the table using tailwind
-  Updated the phone number to be text instead of an integer to account for the fact that phone numbers are made up of digits but are not actually numbers. Also improves the search experience by allowing the user to search by partial phone numbers.
-  Added formating for the phone number to make it more readable


## TODO: 
The following are the things that I want to do to improve the advocate search experience.

-  Consider using a loading skeleton if that is more appropriate than a loading state for the target ux.
-  Improve the advocate query  so that a secondary query for specialties is not required.
-  Investigate using FTS for searching advocates
-  Implement a cache using React Query. Helpful for optimistic updates and invalidating default state.
-  Add better loading state to the table
-  Add pagination to the table and API
-  Add sorting to the table and API
-  Add clickable support for specialties
-  Add a query string support to the page to support refresh of the page with the same search term
-  Add prettier formatting for the project
-  Investigate using a different approach for specialty filtering so that it is distinct from the text search. Possibly using a tag field
-  Create a card based mobile/responsive alternative format for the table
-  Add a more nuanced search experience by supporting searching/filtering by partial matches of multiple search tokens at once. 
- 

