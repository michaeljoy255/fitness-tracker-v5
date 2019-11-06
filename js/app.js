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
    CABLE_TRICEP_PULLDOWNS: "Cable Tricep Pulldowns",
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
    FRONT_RAISES: "Front Raises",
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

// CLASSES #####################################################################
// View manipulation and general functions
class View {
    constructor() {}

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

        document.querySelector('#timer').innerHTML = `${hours}:${mins}:${secs}`;

        clearTimeout(this.activityTimer.interval);
        this.activityTimer.interval = setTimeout(() => { this.activityTimer(startTime) }, 1000);
    }

    static stopActivityTimer() {
        clearTimeout(this.activityTimer.interval);
        console.log("Stopped activity timer");
    }

    // Returns date string formatted like MM/DD/YYYY
    static getDateString() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return (month + "/" + day + "/" + year);
    }

    // Returns string formatted like 1H 7M 32S
    static getTimeString() {
        // @TODO - implement!
        return "";
    }

    // HOME PAGE
    static buildHomePage(user) {
        let footer = "<p>WIP Fitness Tracker v5 ~ Michael J</p>";
        let title = "<h1 class='title'>Fitness Tracker</h1>";
        let btns = "";

        // Build routine buttons HTML
        user.routines.forEach( (rout, id) => {
            btns += `<a href='#' class='btn' id='routine${id}'>${rout.name}</a>`;
        });

        let divRoutines = `<div class="routines">${title}${btns}</div>`;
        let section = `<section class="home">${divRoutines}${footer}</section>`;

        // Set Home page HTML
        document.querySelector('div.home').innerHTML = section; 

        // Click listeners for each routine button - added once HTML exists
        user.routines.forEach( (rout, id) => {
            document.querySelector(`#routine${id}`).addEventListener("click", () => {
                window.location.href = `activity.html?routine=${id}`;
            });
        });
    }

    // ACTIVITY PAGE
    static buildActivityPage(user, routineId) {
        // Set date HTML and start activity timer
        document.querySelector('#date').innerHTML = View.getDateString();
        View.activityTimer(new Date());

        // Routine as title at top
        let routine = `<section class='routine'>
            <i class="material-icons">fitness_center</i>
            ${user.getRoutineById(routineId).name}
            <i class="material-icons">fitness_center</i>
        </section>`;
   
        // Build exercise sections HTML
        let exerciseSections = "";
        let tags = "";
        let inputs = "";

        user.getRoutineById(routineId).exerciseIds.forEach( exerId => {
            tags = "WIP: Icons for the current exercise..."
            inputs = "WIP: Inputs like duration or sets..."
            exerciseSections += `<section class='exercise'>
                <div class='top'>
                    <span>${user.getExerciseById(exerId).name}</span>
                    <span class='category'>${user.getExerciseById(exerId).category}</span>
                </div>
                <hr />
                <div class='tags'>
                    ${tags}
                </div>
                <div class='inputs'>
                    ${inputs}
                </div>
            </section>`;
        });

        // Finish button and textarea
        let footer = `<section>
            <a href="#" class="btn" onclick="alert('Clicked!')">Finish Activity - To Clipboard</a>
            <textarea id="results"></textarea>
        </section>`;

        let allSections = routine + exerciseSections + footer;

        // Set Activity page HTML
        document.querySelector('div.activity').innerHTML = allSections;

        // Click listener for cancel activity button
        document.querySelector("#cancel").addEventListener("click", () => {
            if (confirm("Discard this activity and return to the Home page?")){
                View.stopActivityTimer();
                window.location.href = "index.html";
            };
        });
    }
}

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

    addExercise(...exerciseParams) {
        this.exercises.set(this.idCounter, new Exercise(...exerciseParams));
        this.idCounter++;
    }

    addRoutine(...routineParams) {
        this.routines.set(this.idCounter, new Routine(...routineParams));
        this.idCounter++;
    }

    addActivity(...activityParams) {
        this.activities.set(this.idCounter, new Activity(...activityParams));
        this.idCounter++;
        console.log("Starting activity timer");
        Profile.activityTimer(new Date());
    }

    addRecord(...recordParams) {
        this.records.set(this.idCounter, new Record(...recordParams));
        this.idCounter++;
    }

    addMeasurement(...measurementParams) {
        this.measurements.set(this.idCounter, new Measurement(...measurementParams));
        this.idCounter++;
    }

    getExerciseIdByName(exerciseName){
        for(let exerKey of this.exercises.keys()) {
            if (this.exercises.get(exerKey).name === exerciseName) {
                return exerKey;
            }
        }
    }

    getExerciseById(exerciseId){
        return this.exercises.get(Number(exerciseId));
    }

    getRoutineById(routineId){
        return this.routines.get(Number(routineId));
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
        this.addExercise(ExerciseEnum.CABLE_TRICEP_PULLDOWNS, CategoryEnum.TRICEPS, ...seedWeight);
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
        this.addExercise(ExerciseEnum.FRONT_RAISES, CategoryEnum.SHOULDERS, ...seedWeight);
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
            this.getExerciseIdByName(ExerciseEnum.CABLE_TRICEP_PULLDOWNS),
            this.getExerciseIdByName(ExerciseEnum.TRICEP_PRESS_MACHINE),
            this.getExerciseIdByName(ExerciseEnum.STRETCHING)
        ]);
        this.addRoutine("Back and Biceps", [
            this.getExerciseIdByName(ExerciseEnum.ELLIPTICAL),
            this.getExerciseIdByName(ExerciseEnum.BENT_OVER_ROWS),
            this.getExerciseIdByName(ExerciseEnum.SHRUGS),
            this.getExerciseIdByName(ExerciseEnum.STIFF_LEG_DEADLIFTS),
            this.getExerciseIdByName(ExerciseEnum.ASSISTED_PULL_UPS),
            this.getExerciseIdByName(ExerciseEnum.OVERHAND_CURLS),
            this.getExerciseIdByName(ExerciseEnum.UNDERHAND_CURLS),
            this.getExerciseIdByName(ExerciseEnum.HAMMER_CURLS),
            this.getExerciseIdByName(ExerciseEnum.STRETCHING)
        ]);
        this.addRoutine("Legs, Shoulders, and Core", [
            this.getExerciseIdByName(ExerciseEnum.ELLIPTICAL),
            this.getExerciseIdByName(ExerciseEnum.SIDE_RAISES),
            this.getExerciseIdByName(ExerciseEnum.FRONT_RAISES),
            this.getExerciseIdByName(ExerciseEnum.SHOULDER_PRESS_MACHINE),
            this.getExerciseIdByName(ExerciseEnum.LEG_PRESS_MACHINE),
            this.getExerciseIdByName(ExerciseEnum.LEG_EXTENSION_MACHINE),
            this.getExerciseIdByName(ExerciseEnum.LEG_CURL_MACHINE),
            this.getExerciseIdByName(ExerciseEnum.CALF_EXTENSION_MACHINE),
            this.getExerciseIdByName(ExerciseEnum.STANDING_GLUTE_MACHINE),
            this.getExerciseIdByName(ExerciseEnum.HIP_ABDUCTION_MACHINE),
            this.getExerciseIdByName(ExerciseEnum.HIP_ADDUCTION_MACHINE),
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
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.ELLIPTICAL), null, 420, "", []);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.STRETCHING), null, 480, "", []);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.FLAT_BENCH_PRESS), null, null, "", [
            new ASet(120, 10),
            new ASet(120, 10),
            new ASet(120, 10),
            new ASet(120, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.INCLINE_BENCH_PRESS), null, null, "", [
            new ASet(72.5, 10),
            new ASet(72.5, 10),
            new ASet(72.5, 10),
            new ASet(72.5, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.DECLINE_BENCH_PRESS), null, null, "", [
            new ASet(120, 10),
            new ASet(120, 10),
            new ASet(120, 10),
            new ASet(120, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.FLY_MACHINE_CHEST), null, null, "", [
            new ASet(120, 10),
            new ASet(120, 10),
            new ASet(120, 10),
            new ASet(120, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.CABLE_TRICEP_PULLDOWNS), null, null, "", [
            new ASet(40, 10),
            new ASet(40, 10),
            new ASet(40, 10),
            new ASet(40, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.TRICEP_PRESS_MACHINE), null, null, "", [
            new ASet(185, 10),
            new ASet(185, 10),
            new ASet(185, 10),
            new ASet(185, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.BENT_OVER_ROWS), null, null, "", [
            new ASet(117.5, 10),
            new ASet(117.5, 10),
            new ASet(117.5, 10),
            new ASet(117.5, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.SHRUGS), null, null, "", [
            new ASet(187.5, 10),
            new ASet(187.5, 10),
            new ASet(187.5, 10),
            new ASet(187.5, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.STIFF_LEG_DEADLIFTS), null, null, "", [
            new ASet(100, 10),
            new ASet(100, 10),
            new ASet(100, 10),
            new ASet(100, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.ASSISTED_PULL_UPS), null, null, "", [
            new ASet(30, 10),
            new ASet(30, 10),
            new ASet(30, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.OVERHAND_CURLS), null, null, "", [
            new ASet(30, 10),
            new ASet(30, 10),
            new ASet(30, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.UNDERHAND_CURLS), null, null, "", [
            new ASet(25, 10),
            new ASet(25, 10),
            new ASet(25, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.HAMMER_CURLS), null, null, "", [
            new ASet(25, 10),
            new ASet(25, 10),
            new ASet(25, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.SIDE_RAISES), null, null, "", [
            new ASet(10, 10),
            new ASet(10, 10),
            new ASet(10, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.FRONT_RAISES), null, null, "", [
            new ASet(10, 10),
            new ASet(10, 10),
            new ASet(10, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.SHOULDER_PRESS_MACHINE), null, null, "", [
            new ASet(60, 10),
            new ASet(60, 10),
            new ASet(60, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.LEG_PRESS_MACHINE), null, null, "", [
            new ASet(175, 10),
            new ASet(175, 10),
            new ASet(175, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.LEG_EXTENSION_MACHINE), null, null, "", [
            new ASet(90, 10),
            new ASet(90, 10),
            new ASet(90, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.LEG_CURL_MACHINE), null, null, "", [
            new ASet(85, 10),
            new ASet(85, 10),
            new ASet(90, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.CALF_EXTENSION_MACHINE), null, null, "", [
            new ASet(175, 10),
            new ASet(175, 10),
            new ASet(175, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.STANDING_GLUTE_MACHINE), null, null, "", [
            new ASet(125, 10),
            new ASet(125, 10),
            new ASet(125, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.HIP_ABDUCTION_MACHINE), null, null, "", [
            new ASet(200, 10),
            new ASet(200, 10),
            new ASet(200, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.HIP_ADDUCTION_MACHINE), null, null, "", [
            new ASet(165, 10),
            new ASet(165, 10),
            new ASet(165, 10)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.ABDOMINAL_CRUNCH_MACHINE), null, null, "", [
            new ASet(35, 25),
            new ASet(35, 25),
            new ASet(35, 25),
            new ASet(35, 25)
        ]);
        this.addRecord(this.getExerciseIdByName(ExerciseEnum.OBLIQUE_SIDE_BEND), null, null, "", [
            new ASet(45, 25),
            new ASet(45, 25),
            new ASet(45, 25),
            new ASet(45, 25)
        ]);
    }
}

// MAIN ########################################################################
document.addEventListener("DOMContentLoaded", (e) => {
    var user = new Profile();
    user.seedExampleExercises();
    user.seedExampleRoutines();
    user.seedExampleRecords();
    console.log(user);

    // Query url to determine which page to load
    const urlParams = new URLSearchParams(window.location.search);
    const routineParam = urlParams.get('routine');

    if (routineParam) {
        View.buildActivityPage(user, routineParam);
    } else {
        View.buildHomePage(user);
    }
});