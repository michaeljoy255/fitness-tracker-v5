"use strict"

// ENUM for categories and exercise names - Add new ones here only!
const ExerciseEnum = Object.freeze({
    CARDIO_1: { category: "Cardio", name: "Elliptical" },
    MISC_1: { category: "Miscellanous", name: "Stretching" },
    CHEST_1: { category: "Chest", name: "Flat Bench Press" },
    CHEST_2:  { category: "Chest", name: "Incline Bench Press" },
    CHEST_3:  { category: "Chest", name: "Decline Bench Press" },
    CHEST_4:  { category: "Chest", name: "Fly Machine (Chest)" },
    CHEST_5: { category: "Chest", name: "Cable Chest Side Pulls" },
    TRICEPS_1: { category: "Triceps", name: "Cable Rope Pulldowns" },
    TRICEPS_2: { category: "Triceps", name: "Tricep Press Machine" },
    BACK_1: { category: "Back", name: "Bent Over Rows" },
    BACK_2: { category: "Back", name: "Shrugs" },
    BACK_3: { category: "Back", name: "Stiff-Leg Deadlifts" },
    BACK_4: { category: "Back", name: "Assisted Pull-ups" },
    BACK_5: { category: "Back", name: "Fly Machine (Back)" },
    BICEPS_1: { category: "Biceps", name: "Underhand Curls" },
    BICEPS_2: { category: "Biceps", name: "Hammer Curls" },
    BICEPS_3: { category: "Biceps", name: "Overhand Curls" },
    SHOULDERS_1: { category: "Shoulders", name: "Side Raises" },
    SHOULDERS_2: { category: "Shoulders", name: "Front Raises" },
    SHOULDERS_3: { category: "Shoulders", name: "Shoulder Press Machine" },
    LEGS_1: { category: "Legs", name: "Leg Press Machine" },
    LEGS_2: { category: "Legs", name: "Leg Extension Machine" },
    LEGS_3: { category: "Legs", name: "Leg Curl Machine" },
    LEGS_4: { category: "Legs", name: "Calf Extension Machine" },
    LEGS_5: { category: "Legs", name: "Hip Abduction (Out) Machine" },
    LEGS_6: { category: "Legs", name: "Hip Adduction (In) Machine" },
    LEGS_7: { category: "Legs", name: "Standing Glute Machine" },
    CORE_1: { category: "Core", name: "Abdominal Crunch Machine" },
    CORE_2: { category: "Core", name: "Oblique Side Bend" }
});

class Exercise {
    constructor(id, category, name) {
        this.id = id;
        this.category = category;
        this.name = name;
    }
}

class Routine {
    constructor(id, name, exerciseIds) {
        this.id = id;
        this.name = name;
        this.exerciseIds = exerciseIds;
    }
}

class Activity {
    constructor(startTime, endTime, routineId, actions) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.routineId = routineId;
        this.actions = actions || [];
    }
}

class Action {
    constructor(exerciseId, duration, sets) {
        this.exerciseId = exerciseId;
        this.duration = duration;
        this.sets = sets || [];
    }
}

class WeightReps {
    constructor(weight, reps) {
        this.weight = weight;
        this.reps = reps;
    }
}

class Profile {
    constructor() {
        this.exercises = [];
        this.routines = [];
        this.activities = [];
        this.previousActions = [];
    }

    seedExercises() {
        console.log("Seeding exercises");
        this.exercises = [
            { category: ExerciseEnum.CARDIO_1.category, name: ExerciseEnum.CARDIO_1.name },
            { category: ExerciseEnum.MISC_1.category, name: ExerciseEnum.MISC_1.name },
            { category: ExerciseEnum.CHEST_1.category, name: ExerciseEnum.CHEST_1.name },
            { category: ExerciseEnum.CHEST_2.category, name: ExerciseEnum.CHEST_2.name },
            { category: ExerciseEnum.CHEST_3.category, name: ExerciseEnum.CHEST_3.name },
            { category: ExerciseEnum.CHEST_4.category, name: ExerciseEnum.CHEST_4.name },
            { category: ExerciseEnum.CHEST_5.category, name: ExerciseEnum.CHEST_5.name },
            { category: ExerciseEnum.TRICEPS_1.category, name: ExerciseEnum.TRICEPS_1.name },
            { category: ExerciseEnum.TRICEPS_2.category, name: ExerciseEnum.TRICEPS_2.name },
            { category: ExerciseEnum.BACK_1.category, name: ExerciseEnum.BACK_1.name },
            { category: ExerciseEnum.BACK_2.category, name: ExerciseEnum.BACK_2.name },
            { category: ExerciseEnum.BACK_3.category, name: ExerciseEnum.BACK_3.name },
            { category: ExerciseEnum.BACK_4.category, name: ExerciseEnum.BACK_4.name },
            { category: ExerciseEnum.BACK_5.category, name: ExerciseEnum.BACK_5.name },
            { category: ExerciseEnum.BICEPS_1.category, name: ExerciseEnum.BICEPS_1.name },
            { category: ExerciseEnum.BICEPS_2.category, name: ExerciseEnum.BICEPS_2.name },
            { category: ExerciseEnum.BICEPS_3.category, name: ExerciseEnum.BICEPS_3.name },
            { category: ExerciseEnum.SHOULDERS_1.category, name: ExerciseEnum.SHOULDERS_1.name },
            { category: ExerciseEnum.SHOULDERS_2.category, name: ExerciseEnum.SHOULDERS_2.name },
            { category: ExerciseEnum.SHOULDERS_3.category, name: ExerciseEnum.SHOULDERS_3.name },
            { category: ExerciseEnum.LEGS_1.category, name: ExerciseEnum.LEGS_1.name },
            { category: ExerciseEnum.LEGS_2.category, name: ExerciseEnum.LEGS_2.name },
            { category: ExerciseEnum.LEGS_3.category, name: ExerciseEnum.LEGS_3.name },
            { category: ExerciseEnum.LEGS_4.category, name: ExerciseEnum.LEGS_4.name },
            { category: ExerciseEnum.LEGS_5.category, name: ExerciseEnum.LEGS_5.name },
            { category: ExerciseEnum.LEGS_6.category, name: ExerciseEnum.LEGS_6.name },
            { category: ExerciseEnum.LEGS_7.category, name: ExerciseEnum.LEGS_7.name },
            { category: ExerciseEnum.CORE_1.category, name: ExerciseEnum.CORE_1.name },
            { category: ExerciseEnum.CORE_2.category, name: ExerciseEnum.CORE_2.name }
        ].map( (exer, i) => {
            // map adds index as exerciseId
            return new Exercise(i, exer.category, exer.name);
        });
    }

    seedRoutines() {
        console.log("Seeding routines");
        this.routines = [
            {
                name: "Chest and Triceps",
                exerciseIds: [
                    this.getExerciseIdByName(ExerciseEnum.CARDIO_1.name),
                    this.getExerciseIdByName(ExerciseEnum.CHEST_1.name),
                    this.getExerciseIdByName(ExerciseEnum.CHEST_2.name),
                    this.getExerciseIdByName(ExerciseEnum.CHEST_3.name),
                    this.getExerciseIdByName(ExerciseEnum.CHEST_4.name),
                    this.getExerciseIdByName(ExerciseEnum.CHEST_5.name),
                    this.getExerciseIdByName(ExerciseEnum.TRICEPS_1.name),
                    this.getExerciseIdByName(ExerciseEnum.TRICEPS_1.name),
                    this.getExerciseIdByName(ExerciseEnum.MISC_1.name)
                ]
            },
            { 
                name: "Back and Biceps",
                exerciseIds: [
                    this.getExerciseIdByName(ExerciseEnum.CARDIO_1.name),
                    this.getExerciseIdByName(ExerciseEnum.BACK_1.name),
                    this.getExerciseIdByName(ExerciseEnum.BACK_2.name),
                    this.getExerciseIdByName(ExerciseEnum.BACK_3.name),
                    this.getExerciseIdByName(ExerciseEnum.BACK_4.name),
                    this.getExerciseIdByName(ExerciseEnum.BACK_5.name),
                    this.getExerciseIdByName(ExerciseEnum.BICEPS_1.name),
                    this.getExerciseIdByName(ExerciseEnum.BICEPS_2.name),
                    this.getExerciseIdByName(ExerciseEnum.BICEPS_3.name),
                    this.getExerciseIdByName(ExerciseEnum.MISC_1.name)
                ]
            },
            {
                name: "Legs, Shoulders, and Core",
                exerciseIds: [
                    this.getExerciseIdByName(ExerciseEnum.CARDIO_1.name),
                    this.getExerciseIdByName(ExerciseEnum.SHOULDERS_1.name),
                    this.getExerciseIdByName(ExerciseEnum.SHOULDERS_2.name),
                    this.getExerciseIdByName(ExerciseEnum.SHOULDERS_3.name),
                    this.getExerciseIdByName(ExerciseEnum.LEGS_1.name),
                    this.getExerciseIdByName(ExerciseEnum.LEGS_2.name),
                    this.getExerciseIdByName(ExerciseEnum.LEGS_3.name),
                    this.getExerciseIdByName(ExerciseEnum.LEGS_4.name),
                    this.getExerciseIdByName(ExerciseEnum.LEGS_5.name),
                    this.getExerciseIdByName(ExerciseEnum.LEGS_6.name),
                    this.getExerciseIdByName(ExerciseEnum.LEGS_7.name),
                    this.getExerciseIdByName(ExerciseEnum.CORE_1.name),
                    this.getExerciseIdByName(ExerciseEnum.CORE_2.name),
                    this.getExerciseIdByName(ExerciseEnum.MISC_1.name)
                ]
            },
            {
                name: "Cardio",
                exerciseIds: [
                    this.getExerciseIdByName(ExerciseEnum.CARDIO_1.name),
                    this.getExerciseIdByName(ExerciseEnum.MISC_1.name)
                ]
            }
        ].map( (routine, i) => {
            // map adds index as routineId
            return new Routine(i, routine.name, routine.exerciseIds);
        });
    }

    seedPreviousActions() {
        console.log("Seeding previous actions");
        this.previousActions = [
            new Action(this.getExerciseIdByName(ExerciseEnum.CARDIO_1.name), 7),
            new Action(this.getExerciseIdByName(ExerciseEnum.MISC_1.name), 10),
            new Action(this.getExerciseIdByName(ExerciseEnum.CHEST_1.name), null, [
                new WeightReps(117.5, 10),
                new WeightReps(117.5, 10),
                new WeightReps(117.5, 10),
                new WeightReps(117.5, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.CHEST_2.name), null, [
                new WeightReps(72.5, 10),
                new WeightReps(72.5, 10),
                new WeightReps(72.5, 10),
                new WeightReps(72.5, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.CHEST_3.name), null, [
                new WeightReps(115, 10),
                new WeightReps(115, 10),
                new WeightReps(115, 10),
                new WeightReps(115, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.CHEST_4.name), null, [
                new WeightReps(117.5, 10),
                new WeightReps(117.5, 10),
                new WeightReps(117.5, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.CHEST_5.name), null, [
                new WeightReps(20.5, 10),
                new WeightReps(20.5, 10),
                new WeightReps(20.5, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.TRICEPS_1.name), null, [
                new WeightReps(39, 10),
                new WeightReps(39, 10),
                new WeightReps(39, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.TRICEPS_2.name), null, [
                new WeightReps(180, 10),
                new WeightReps(180, 10),
                new WeightReps(180, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.BACK_1.name), null, [
                new WeightReps(115, 10),
                new WeightReps(115, 10),
                new WeightReps(115, 10),
                new WeightReps(115, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.BACK_2.name), null, [
                new WeightReps(185, 10),
                new WeightReps(185, 10),
                new WeightReps(185, 10),
                new WeightReps(185, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.BACK_3.name), null, [
                new WeightReps(97.5, 10),
                new WeightReps(97.5, 10),
                new WeightReps(97.5, 10),
                new WeightReps(97.5, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.BACK_4.name), null, [
                new WeightReps(40, 10),
                new WeightReps(40, 10),
                new WeightReps(40, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.BACK_5.name), null, [
                new WeightReps(80, 10),
                new WeightReps(80, 10),
                new WeightReps(80, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.BICEPS_1.name), null, [
                new WeightReps(50, 10),
                new WeightReps(50, 10),
                new WeightReps(50, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.BICEPS_2.name), null, [
                new WeightReps(25, 10),
                new WeightReps(25, 10),
                new WeightReps(25, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.BICEPS_3.name), null, [
                new WeightReps(30, 10),
                new WeightReps(30, 10),
                new WeightReps(30, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.SHOULDERS_1.name), null, [
                new WeightReps(10, 10),
                new WeightReps(10, 10),
                new WeightReps(10, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.SHOULDERS_2.name), null, [
                new WeightReps(10, 10),
                new WeightReps(10, 10),
                new WeightReps(10, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.SHOULDERS_3.name), null, [
                new WeightReps(55, 10),
                new WeightReps(55, 10),
                new WeightReps(55, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.LEGS_1.name), null, [
                new WeightReps(170, 10),
                new WeightReps(170, 10),
                new WeightReps(170, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.LEGS_2.name), null, [
                new WeightReps(85, 10),
                new WeightReps(85, 10),
                new WeightReps(85, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.LEGS_3.name), null, [
                new WeightReps(80, 10),
                new WeightReps(80, 10),
                new WeightReps(80, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.LEGS_4.name), null, [
                new WeightReps(170, 10),
                new WeightReps(170, 10),
                new WeightReps(170, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.LEGS_5.name), null, [
                new WeightReps(195, 10),
                new WeightReps(195, 10),
                new WeightReps(195, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.LEGS_6.name), null, [
                new WeightReps(160, 10),
                new WeightReps(160, 10),
                new WeightReps(160, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.LEGS_7.name), null, [
                new WeightReps(120, 10),
                new WeightReps(120, 10),
                new WeightReps(120, 10)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.CORE_1.name), null, [
                new WeightReps(35, 25),
                new WeightReps(35, 25),
                new WeightReps(35, 25),
                new WeightReps(35, 25)
            ]),
            new Action(this.getExerciseIdByName(ExerciseEnum.CORE_2.name), null, [
                new WeightReps(45, 25),
                new WeightReps(45, 25),
                new WeightReps(45, 25),
                new WeightReps(45, 25)
            ]),
        ];
    }

    // Returns first exercise id with matching name
    getExerciseIdByName(exerciseName) {
        return this.exercises.filter( exer => {
            return exer.name === exerciseName;
        })[0].id;
    }

    // Returns first Exercise Object with matching id
    getExerciseById(exerciseId) {
        return this.exercises.filter( exer => {
            return exer.id === exerciseId;
        })[0];
    }

    // Returns first Routine Object with matching id
    getRoutineById(routineId) {
        return this.routines.filter( rout => {
            return rout.id === routineId;
        })[0];
    }

    // Returns first Action Object with matching id
    getPreviousActionByExerciseId(exerciseId) {
        return this.previousActions.filter( action => {
            return action.exerciseId === exerciseId;
        })[0];
    }

    // Returns an array with all routine names
    getAllRoutineNames() {
        return this.routines.map( rout => {
            return rout.name;
        });
    }

    static padLeadingZeros(num) {
        let str = num.toString();
        while (str.length < 2) {
            str = "0" + str
        }; 
        return str;
    }

    createActivity(routineId) {
        var time = new Date();
        this.activities.push(new Activity(time, null, routineId, []));
        Profile.activityTimer(time);
    }

    // Tracks time for current activity
    static activityTimer(startTime) {
        const now = new Date();
        const timeDifference = (now - startTime);
        const secondsInADay = 60 * 60 * 1000 * 24;
        const secondsInAHour = 60 * 60 * 1000;
            
        let hours = Math.floor((timeDifference % (secondsInADay)) / (secondsInAHour) * 1);
        let mins = Math.floor(((timeDifference % (secondsInADay)) % (secondsInAHour)) / (60 * 1000) * 1);
        let secs = Math.floor((((timeDifference % (secondsInADay)) % (secondsInAHour)) % (60 * 1000)) / 1000 * 1);

        hours = Profile.padLeadingZeros(hours);
        mins = Profile.padLeadingZeros(mins);
        secs = Profile.padLeadingZeros(secs);
        // @TODO - use start and end times in AppData so you can control when to print
        //document.getElementById('timer').innerHTML = hours + ":" + mins + ":" + secs;

        console.log(hours, mins, secs); // @TODO - remove this

        clearTimeout(this.activityTimer.interval);
        this.activityTimer.interval = setTimeout(() => { this.activityTimer(startTime) }, 1000);
    }

    static stopActivityTimer() {
        clearTimeout(this.activityTimer.interval);
        console.log("Stopped activity timer");
    }

    // Returns string with MM/DD/YYYY date format
    static getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return (month + "/" + day + "/" + year);
    }
}

//##############################################################################
$( document ).ready(function() {
    var user = new Profile();
    user.seedExercises();
    user.seedRoutines();
    user.seedPreviousActions();

    console.log(user);
});