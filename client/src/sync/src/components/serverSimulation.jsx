// delay will be multiplied by 1000
// prompts need to be more than 60 apart

export const serverSimulationEvents = [
  {
    eventType: "prompt",
    eventContent: "change my prompt once",
    delay: 10
  },
  {
    eventType: "prompt",
    eventContent: "change my prompt twice",
    delay: 10
  },
  {
    eventType: "text-response",
    eventContent: "change my prompt thrice",
    delay: 10
  },
  {
    eventType: "prompt",
    eventContent: "change my prompt thrice",
    delay: 10
  },
]