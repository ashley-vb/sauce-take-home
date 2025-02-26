# Sauce Technical Task

## Task 1: Persist the generated highlights in the db (SQLite)
1. I wrote the analysis results highlights to the db. 
2. Added error handling in case this process did not work. Error and debug logs are very helpful when you have to debug back through the code.
3. Fixed incorrect code (e.g. 'createHighlight' query had incorrect order of args)
4. Added some todo comments to make sure I went back to those areas for improvement

#### Challenges:
Coming into this assessment I was quite nervous. I went through the code and had some issues running the server. 
I continued with writing the code, persisting data to the db. 

This part was fine, I made sure highlights were being created in parallel for efficiency. 
My understanding of mutations and the functionality of the resolvers.ts needs improvement as I can't see where highlights get added to the api return.

## Task 2: Display the highlights along with the parent feedback in the rendered list
1. I started by changing the api gql to include highlights in the same call
2. Added some error handling

#### Challenges:
I spent some time looking at how the api's interacted with the resolvers file. 
This part is definitely new (to me), seeing the gql structure and working out how these files interact with one another was definitely interesting! 
Before actually displaying the highlights I went on to add pagination.

## Task 3: Add pagination to the rendered feedback list
1. Added simple pagination to the table. 

#### Challenges
Inline css is not something I have worked with before, ultimately it works the same, but some of the individual styling applied I had to look up.

## Task 4: Allow bulk creation without having the API waiting for highlight creation
1. I ended up splitting the api calls for feedback and highlights, I thought this could be better for efficiency (maybe)
2. Added a modal on the UI to display highlight information. There are many ways of displaying this data.
3. We call the highlights api when the modal is clicked, this means the return of feedback results are not dependent on the creation of highlights.
4. Added css to the modal.
5. Added a mutation and logic for bulk feedback creation.

#### Challenges
I really wasn't sure about my decision to split the calls, I'm sure this can be done in a much cleaner way, but splitting seemed logical at the time.
The modal was also an interesting choice, I could have done a separate page, or a drop-down on the page itself once a feedback item was clicked.
I am used to using external libraries for front end (MUI etc.), so building this up without those was fun.

## Improvements
1. I would have liked to add the total page and page number to the api call. 
2. Possibly a type of flag on the highlight or feedback object to tell us whether highlights have been successfully created.
3. More clean up of the api calls (additional research needed)
4. Categorised feedbacks instead of a simple list
5. Changeable page size on the feedback list 
6. pagination on highlights - if we expect many

## Overall
I was really intrigued by this assessment, it definitely came with it's learning obstacles.

