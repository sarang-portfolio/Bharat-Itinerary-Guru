export const parseJSONOutput = (response: any): any => {
  try {
    const textOutput =
      response?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    return JSON.parse(
      textOutput.replace(/^```json\n/, "").replace(/\n```$/, "")
    );
  } catch (error) {
    throw error;
  }
};
