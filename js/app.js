"use strict";

// ENUMS #######################################################################
const ExerciseEnum = Object.freeze({
    ELLIPTICAL: "Elliptical, Warm-up",
    STRETCHING: "Stretching",
    FLAT_BENCH_PRESS: "Flat Bench Press",
    INCLINE_BENCH_PRESS: "Incline Bench Press",
    DECLINE_BENCH_PRESS: "Decline Bench Press",
    FLY_MACHINE_CHEST: "Fly Machine (Chest)",
    CABLE_CHEST_SIDE_PULLS: "Cable Chest Side Pulls",
    CABLE_ROPE_PULLDOWNS: "Cable Rope Pulldowns",
    TRICEP_PRESS_MACHINE: "Tricep Press Machine",
    BENT_OVER_ROWS: "Bent Over Rows",
    SHRUGS: "Shrugs",
    STIFF_LEG_DEADLIFTS: "Stiff-Leg Deadlifts",
    ASSISTED_PULL_UPS: "Assisted Pull-ups",
    FLY_MACHINE_BACK: "Fly Machine (Back)",
    UNDERHAND_CURLS: "Underhand Curls",
    HAMMER_CURLS: "Hammer Curls",
    OVERHAND_CURLS: "Overhand Curls",
    SIDE_RAISES: "Side Raises",
    FRONT_RAISE: "Front Raises",
    SHOULDER_PRESS_MACHINE: "Shoulder Press Machine",
    LEG_PRESS_MACHINE: "Leg Press Machine",
    LEG_EXTENSION_MACHINE: "Leg Extension Machine",
    LEG_CURL_MACHINE: "Leg Curl Machine",
    CALF_EXTENSION_MACHINE: "Calf Extension Machine",
    HIP_ABDUCTION_MACHINE: "Hip Abduction (Out) Machine",
    HIP_ADDUCTION_MACHINE: "Hip Adduction (In) Machine",
    STANDING_GLUTE_MACHINE: "Standing Glute Machine",
    ABDOMINAL_CRUNCH_MACHINE: "Abdominal Crunch Machine",
    OBLIQUE_SIDE_BEND: "Oblique Side Bend"
});

const CategoryEnum = Object.freeze({
    CARDIO: "Cardio",
    MISC: "Miscellanous",
    CHEST: "Chest",
    BACK: "Back",
    LEGS: "Legs",
    SHOULDERS: "Shoudlers",
    BICEPS: "Biceps",
    TRICEPS: "Triceps",
    CORE: "Core"
});

const UnitsEnum = Object.freeze({
    IMPERIAL: "Imperial",
    METRIC: "Metric"
});

const IntensityEnum = Object.freeze({
    MIN: "Minimal",
    LOW: "Low",
    MED: "Medium",
    HIGH: "High",
    MAX: "Maxed",
});

// CLASSES & FUNCTIONS #########################################################
// Used to define properties of an exercise (UI componets, inputs, etc)
class Exercise {
    constructor(name, category, desc, breaksTag, tempoTag, intensityTag, 
                resistenceTag, inclineTag, distanceInput, durationInput,
                notesInput, setsInput) {
        this.name = name;
        this.category = category;
        this.desc = desc;
        // Exercise UI Goal Tags - Booleans
        this.breaksTag = breaksTag;
        this.tempoTag = tempoTag;
        this.intensityTag = intensityTag;
        this.resistenceTag = resistenceTag;
        this.inclineTag = inclineTag;
        // Exercise Inputs - Booleans
        this.distanceInput = distanceInput;     
        this.durationInput = durationInput;
        this.notesInput = notesInput;
        this.setsInput = setsInput;
    }
}

// Named collection of exercises used by activities
class Routine {
    constructor(name, exerciseIds) {
        this.name = name;
        this.exerciseIds = exerciseIds;
    }
}

// Activity or workout that a user is doing or has completed
class Activity {
    constructor(endTime, routineId, recordIds, weightMoved) {
        this.startTime = new Date();
        this.endTime = endTime;
        this.routineId = routineId;
        this.recordIds = recordIds;
        this.weightMoved = weightMoved;
    }
}

// Performance record for an exercise
class Record {
    constructor(exerciseId, distance, duration, notes, sets) {
        this.date = new Date();
        this.exerciseId = exerciseId;
        this.distance = distance;
        this.duration = duration;
        this.notes = notes;
        this.sets = sets;
    }
}

// Exercise set
class ASet {
    constructor(weight, reps) {
        this.weight = weight;
        this.reps = reps;
    }
}

// Date stamped user measurment
class Measurement {
    constructor(bodyWeight, bodyFat) {
        this.date = new Date();
        this.bodyWeight = bodyWeight;
        this.bodyFat = bodyFat;
        // could include other measurements like chest, arms, waist, etc
    }
}

// Top level user profile
class Profile {
    constructor(email="test@test.com", units=UnitsEnum.IMPERIAL) {
        this.email = email;
        this.units = units;
        this.exercises = new Map();
        this.routines = new Map();
        this.activities = new Map();
        this.records = new Map();
        this.measurements = new Map();
        this.idCounter = 1000;
    }

    // STATIC METHODS ----------------------------------------------------------
    // Tracks time for current activity
    static activityTimer(startTime) {
        const now = new Date();
        const timeDiff = (now - startTime);
        const secsPerDay = 60 * 60 * 1000 * 24;
        const secsPerHour = 60 * 60 * 1000;
            
        let hours = Math.floor((timeDiff % (secsPerDay)) / (secsPerHour) * 1);
        let mins = Math.floor(((timeDiff % (secsPerDay)) % (secsPerHour)) / (60 * 1000) * 1);
        let secs = Math.floor((((timeDiff % (secsPerDay)) % (secsPerHour)) % (60 * 1000)) / 1000 * 1);

        hours = hours.toString().padStart(2, '0');
        mins = mins.toString().padStart(2, '0');
        secs = secs.toString().padStart(2, '0');
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

    // Returns date string formatted like MM/DD/YYYY
    static getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return (month + "/" + day + "/" + year);
    }

    // Returns string formatted like 1H 7M 32S
    static getFormattedTime() {
        return "";
    }

    // OTHER METHODS -----------------------------------------------------------
    addExercise(...args) {
        this.exercises.set(this.idCounter, new Exercise(...args));
        this.idCounter++;
    }

    addRoutine(...args) {
        this.routines.set(this.idCounter, new Routine(...args));
        this.idCounter++;
    }

    addActivity(...args) {
        this.activities.set(this.idCounter, new Activity(...args));
        this.idCounter++;

        var time = new Date();
        this.activities.push(new Activity(time, null, routineId, []));
        Profile.activityTimer(time);
    }

    addRecord(...args) {
        this.records.set(this.idCounter, new Record(...args));
        this.idCounter++;
    }

    addMeasurement(...args) {
        this.measurements.set(this.idCounter, new Measurement(...args));
        this.idCounter++;
    }

    getExerciseIdByName(name){
        // @TODO - better way of getting ID (truely understand your code!)
        for(let exer of this.exercises[Symbol.iterator]()) {
            if(exer[1].name === name) {
                return exer[0]; // returns map key
            }
        }
    }

    seedExampleExercises() {
        console.log("Seeding exercises");
        const seedCardio = ["", false, false, true, true, true, true, true, true, false];
        const seedStretch = ["", false, false, true, false, false, false, true, true, false];
        const seedWeight = ["", true, true, true, false, false, false, false, true, true];
        this.addExercise(ExerciseEnum.ELLIPTICAL, CategoryEnum.CARDIO, ...seedCardio);
        this.addExercise(ExerciseEnum.STRETCHING, CategoryEnum.MISC, ...seedStretch);
        this.addExercise(ExerciseEnum.FLAT_BENCH_PRESS, CategoryEnum.CHEST, ...seedWeight);
        this.addExercise(ExerciseEnum.INCLINE_BENCH_PRESS, CategoryEnum.CHEST, ...seedWeight);
        this.addExercise(ExerciseEnum.DECLINE_BENCH_PRESS, CategoryEnum.CHEST, ...seedWeight);
        this.addExercise(ExerciseEnum.FLY_MACHINE_CHEST, CategoryEnum.CHEST, ...seedWeight);
        this.addExercise(ExerciseEnum.CABLE_CHEST_SIDE_PULLS, CategoryEnum.CHEST, ...seedWeight);
        this.addExercise(ExerciseEnum.CABLE_ROPE_PULLDOWNS, CategoryEnum.TRICEPS, ...seedWeight);
        this.addExercise(ExerciseEnum.TRICEP_PRESS_MACHINE, CategoryEnum.TRICEPS, ...seedWeight);
        this.addExercise(ExerciseEnum.BENT_OVER_ROWS, CategoryEnum.BACK, ...seedWeight);
        this.addExercise(ExerciseEnum.SHRUGS, CategoryEnum.BACK, ...seedWeight);
        this.addExercise(ExerciseEnum.STIFF_LEG_DEADLIFTS, CategoryEnum.BACK, ...seedWeight);
        this.addExercise(ExerciseEnum.ASSISTED_PULL_UPS, CategoryEnum.BACK, ...seedWeight);
        this.addExercise(ExerciseEnum.FLY_MACHINE_BACK, CategoryEnum.BACK, ...seedWeight);
        this.addExercise(ExerciseEnum.UNDERHAND_CURLS, CategoryEnum.BICEPS, ...seedWeight);
        this.addExercise(ExerciseEnum.HAMMER_CURLS, CategoryEnum.BICEPS, ...seedWeight);
        this.addExercise(ExerciseEnum.OVERHAND_CURLS, CategoryEnum.BICEPS, ...seedWeight);
        this.addExercise(ExerciseEnum.SIDE_RAISES, CategoryEnum.SHOULDERS, ...seedWeight);
        this.addExercise(ExerciseEnum.FRONT_RAISE, CategoryEnum.SHOULDERS, ...seedWeight);
        this.addExercise(ExerciseEnum.SHOULDER_PRESS_MACHINE, CategoryEnum.SHOULDERS, ...seedWeight);
        this.addExercise(ExerciseEnum.LEG_PRESS_MACHINE, CategoryEnum.LEGS, ...seedWeight);
        this.addExercise(ExerciseEnum.LEG_EXTENSION_MACHINE, CategoryEnum.LEGS, ...seedWeight);
        this.addExercise(ExerciseEnum.LEG_CURL_MACHINE, CategoryEnum.LEGS, ...seedWeight);
        this.addExercise(ExerciseEnum.CALF_EXTENSION_MACHINE, CategoryEnum.LEGS, ...seedWeight);
        this.addExercise(ExerciseEnum.HIP_ABDUCTION_MACHINE, CategoryEnum.LEGS, ...seedWeight);
        this.addExercise(ExerciseEnum.HIP_ADDUCTION_MACHINE, CategoryEnum.LEGS, ...seedWeight);
        this.addExercise(ExerciseEnum.STANDING_GLUTE_MACHINE, CategoryEnum.LEGS, ...seedWeight);
        this.addExercise(ExerciseEnum.ABDOMINAL_CRUNCH_MACHINE, CategoryEnum.CORE, ...seedWeight);
        this.addExercise(ExerciseEnum.OBLIQUE_SIDE_BEND, CategoryEnum.CORE, ...seedWeight);
    }

    seedExampleRoutines() {
        console.log("Seeding routines");
        this.addRoutine("Chest and Triceps", [
            this.getExerciseIdByName(ExerciseEnum.ELLIPTICAL),
            this.getExerciseIdByName(ExerciseEnum.FLAT_BENCH_PRESS),
            this.getExerciseIdByName(ExerciseEnum.INCLINE_BENCH_PRESS),
            this.getExerciseIdByName(ExerciseEnum.DECLINE_BENCH_PRESS),
            this.getExerciseIdByName(ExerciseEnum.FLY_MACHINE_CHEST),
            this.getExerciseIdByName(ExerciseEnum.CABLE_CHEST_SIDE_PULLS),
            this.getExerciseIdByName(ExerciseEnum.CABLE_ROPE_PULLDOWNS),
            this.getExerciseIdByName(ExerciseEnum.TRICEP_PRESS_MACHINE),
            this.getExerciseIdByName(ExerciseEnum.STRETCHING)
        ]);
        this.addRoutine("Back and Biceps", [
            this.getExerciseIdByName(ExerciseEnum.ELLIPTICAL),
            this.getExerciseIdByName(ExerciseEnum.BENT_OVER_ROWS),
            this.getExerciseIdByName(ExerciseEnum.SHRUGS),
            this.getExerciseIdByName(ExerciseEnum.STIFF_LEG_DEADLIFTS),
            this.getExerciseIdByName(ExerciseEnum.ASSISTED_PULL_UPS),
            this.getExerciseIdByName(ExerciseEnum.FLY_MACHINE_BACK),
            this.getExerciseIdByName(ExerciseEnum.OVERHAND_CURLS),
            this.getExerciseIdByName(ExerciseEnum.UNDERHAND_CURLS),
            this.getExerciseIdByName(ExerciseEnum.HAMMER_CURLS),
            this.getExerciseIdByName(ExerciseEnum.STRETCHING)
        ]);
        this.addRoutine("Legs, Shoulders, and Core", [
            this.getExerciseIdByName(ExerciseEnum.ELLIPTICAL),
            this.getExerciseIdByName(ExerciseEnum.SIDE_RAISES),
            this.getExerciseIdByName(ExerciseEnum.FRONT_RAISE),
            this.getExerciseIdByName(ExerciseEnum.SHOULDER_PRESS_MACHINE),
            this.getExerciseIdByName(ExerciseEnum.LEG_PRESS_MACHINE),
            this.getExerciseIdByName(ExerciseEnum.LEG_EXTENSION_MACHINE),
            this.getExerciseIdByName(ExerciseEnum.LEG_CURL_MACHINE),
            this.getExerciseIdByName(ExerciseEnum.CALF_EXTENSION_MACHINE),
            this.getExerciseIdByName(ExerciseEnum.HIP_ABDUCTION_MACHINE),
            this.getExerciseIdByName(ExerciseEnum.HIP_ADDUCTION_MACHINE),
            this.getExerciseIdByName(ExerciseEnum.STANDING_GLUTE_MACHINE),
            this.getExerciseIdByName(ExerciseEnum.ABDOMINAL_CRUNCH_MACHINE),
            this.getExerciseIdByName(ExerciseEnum.OBLIQUE_SIDE_BEND),
            this.getExerciseIdByName(ExerciseEnum.STRETCHING)
        ]);
        this.addRoutine("General Cardio", [
            this.getExerciseIdByName(ExerciseEnum.ELLIPTICAL),
            this.getExerciseIdByName(ExerciseEnum.STRETCHING)
        ]);
    }

    seedExampleRecords() {
        console.log("Seeding records");
        // @TODO - decide how to handle sets (as an array, set, map, or something else...)
        // @TODO - convert this over to the next version on github (use current v5???)
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.ELLIPTICAL), null, 420, "", []);

        /*
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
        */
    }
}

// MAIN ########################################################################
document.addEventListener("DOMContentLoaded", (e) => {
    var user = new Profile();
    user.seedExampleExercises();
    user.seedExampleRoutines();
    user.seedExampleRecords();

    console.log(user);
});