export default {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      ingredients: { type: "array", items: { type: "string" } },
      instructions: { type: "string" },
    },
    required: ["name", "ingredients", "instructions"],
  } as const;
  