# Zen Workout

Sculpt routines with precision. Craft sets, timers, and rests for your fitness sanctuary.

## TODO:

### Form

1. Remove workout block
2. Refactor workout block creation
3. More validation logic

### Saved workouts

9. Sort by: created date, # sets, # blocks, A-Z, Z-A
10. Render by default based on date created
11. Search by name
12. Clear all

### Active workout

1. User clicks the start button
2. Workout timer starts
3. Workout timer ends:
   Goes back to the default value
   1. resting block start
   2. Update Exercise
   3. Update next exercise
   4. Update block counter
4. Resting timer ends, the workout timer starts
5. When the set is done:
   1. Update the set counter
   2. Set resting timer to set's resting timer
   3. Repeat from the start the exercise

### Alerts

- Errors
- Saved
- Edited

---

- Start making the layout with tailwind css
- Accessibility check
- Fav icon
- Metadata
- Dark/Light theme
- Translation
