import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager} from "@google/generative-ai/server";

const genAI = new GoogleGenerativeAI("AIzaSyAKFvG_ryCTxx54pjjVvGBkzL1Iwei8J5M");
const fileManager = new GoogleAIFileManager("AIzaSyAKFvG_ryCTxx54pjjVvGBkzL1Iwei8J5M");

const uploadResponse = await fileManager.uploadFile("jetpack.jpg", {
    mimeType: "image/jpeg",
    displayName: "Jetpack drawing",
  });

console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`);

// Get the previously uploaded file's metadata.
const getResponse = await fileManager.getFile(uploadResponse.file.name);

// View the response.
console.log(`Retrieved file ${getResponse.displayName} as ${getResponse.uri}`);

const model = genAI.getGenerativeModel({
  // Choose a Gemini model.
  model: "gemini-1.5-pro",
});

// Upload file ...

// Generate content using text and the URI reference for the uploaded file.
const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri
      }
    },
    { text: "Describe how this product might be manufactured." },
  ]);

// Output the generated text to the console
console.log(result.response.text())
