import { parseJSON, stringifyJSON } from "../../../helpers/helpers.js";

const TESTING_WORKOUTS_DATA = [
  {
    id: 9876543210123,
    date: "Tue Jan 30 2024",
    name: "Martes | Pecho y Espalda",
    sets: "5",
    restingTimeSetsMinutes: "3",
    restingTimeSetsSeconds: "0",
    blocks: "5",
    workingTimeBlocksSeconds: "120",
    restingTimeBlocksSeconds: "45",
    blockSettings: [
      {
        name: "Press de banca",
        order: 0,
      },
      {
        name: "Pull-ups",
        order: 1,
      },
      {
        name: "Press inclinado con mancuernas",
        order: 2,
      },
      {
        name: "Remo con barra T",
        order: 3,
      },
      {
        name: "Aperturas con polea alta",
        order: 4,
      },
    ],
  },
  {
    id: 1357924680132,
    date: "Wed Jan 31 2024",
    name: "Miércoles | Brazos",
    sets: "3",
    restingTimeSetsMinutes: "1",
    restingTimeSetsSeconds: "45",
    blocks: "6",
    workingTimeBlocksSeconds: "60",
    restingTimeBlocksSeconds: "20",
    blockSettings: [
      {
        name: "Curl de bíceps con barra",
        order: 0,
      },
      {
        name: "Fondos en paralelas",
        order: 1,
      },
      {
        name: "Tríceps en polea alta",
        order: 2,
      },
      {
        name: "Martillo con mancuernas",
        order: 3,
      },
      {
        name: "Flexiones diamante",
        order: 4,
      },
      {
        name: "Tríceps en fondos con banco",
        order: 5,
      },
    ],
  },
  {
    id: 2468013579246,
    date: "Thu Feb 01 2024",
    name: "Jueves | Cardio",
    sets: "1",
    restingTimeSetsMinutes: "0",
    restingTimeSetsSeconds: "30",
    blocks: "5",
    workingTimeBlocksSeconds: "180",
    restingTimeBlocksSeconds: "45",
    blockSettings: [
      {
        name: "Carrera en cinta",
        order: 0,
      },
      {
        name: "Salto de cuerda",
        order: 1,
      },
      {
        name: "Bicicleta estática",
        order: 2,
      },
      {
        name: "Burpees",
        order: 3,
      },
      {
        name: "Escalador",
        order: 4,
      },
    ],
  },
  {
    id: 3692581470369,
    date: "Fri Feb 02 2024",
    name: "Viernes | Hombros",
    sets: "4",
    restingTimeSetsMinutes: "2",
    restingTimeSetsSeconds: "0",
    blocks: "5",
    workingTimeBlocksSeconds: "75",
    restingTimeBlocksSeconds: "30",
    blockSettings: [
      {
        name: "Press militar",
        order: 0,
      },
      {
        name: "Elevaciones laterales",
        order: 1,
      },
      {
        name: "Remo al cuello",
        order: 2,
      },
      {
        name: "Face pull",
        order: 3,
      },
      {
        name: "Encogimientos de hombros",
        order: 4,
      },
    ],
  },
  {
    id: 4827039165482,
    date: "Sat Feb 03 2024",
    name: "Sábado | Rutina Completa",
    sets: "5",
    restingTimeSetsMinutes: "3",
    restingTimeSetsSeconds: "30",
    blocks: "7",
    workingTimeBlocksSeconds: "90",
    restingTimeBlocksSeconds: "45",
    blockSettings: [
      {
        name: "Sentadillas",
        order: 0,
      },
      {
        name: "Press de banca",
        order: 1,
      },
      {
        name: "Pull-ups",
        order: 2,
      },
      {
        name: "Curl de bíceps con barra",
        order: 3,
      },
      {
        name: "Press militar",
        order: 4,
      },
      {
        name: "Tríceps en polea alta",
        order: 5,
      },
      {
        name: "Elevaciones laterales",
        order: 6,
      },
    ],
  },
];

/**
 * Save new workout in local storage
 * @param {Object} newWorkout The new workout to be saved
 * @returns {Promise<Array>} A promise that resolves with the updated workouts data array
 */
export function saveWorkout(newWorkout) {
  return new Promise((resolve, reject) => {
    try {
      const rawWorkoutsData = localStorage.getItem("workoutsData");
      const parsedWorkoutsData = rawWorkoutsData
        ? parseJSON(rawWorkoutsData)
        : [];

      const newWorkoutsData = [...parsedWorkoutsData, newWorkout];

      localStorage.setItem("workoutsData", stringifyJSON(newWorkoutsData));
      resolve(newWorkoutsData);
    } catch (error) {
      reject("Error saving the workout. Please try again");
    }
  });
}

/**
 * Get saved workouts from local storage
 * @returns {Promise<Array>} A promise that resolves with the array of saved workouts
 */
export function getWorkouts() {
  return new Promise((resolve, reject) => {
    try {
      const rawWorkoutsData = localStorage.getItem("workoutsData");
      if (!rawWorkoutsData) resolve([]);
      resolve(parseJSON(rawWorkoutsData));
    } catch (error) {
      reject("Error getting the workouts.");
    }
  });
}

/**
 * Loads testing data to the local storage
 */
export function loadTestingData() {
  try {
    const rawWorkoutsData = localStorage.getItem("workoutsData");
    if (rawWorkoutsData) return;
    localStorage.setItem("workoutsData", stringifyJSON(TESTING_WORKOUTS_DATA));
  } catch (error) {
    console.log("Error to load testing data");
  }
}
