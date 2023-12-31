// require('dotenv').config();
// const express = require('express');
// const { Configuration, OpenAIApi } = require('openai');

// const app = express();
// app.use(express.json());

// const configuration = new Configuration({
//     apiKey: process.env.API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// app.post('/api/chat', async (req, res) => {
//     const prompt = req.body.prompt;
//     try {
//         const response = await openai.createChatCompletion({
//             model: "gpt-3.5-turbo",
//             messages: [{ role: "user", content: prompt }],
//         });

//         res.json(response.data);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'An error occurred while processing your request.' });
//     }
// });

import { APIKEY, apikey } from './apikey.js';

var overallResume = ""
document.addEventListener("DOMContentLoaded", function () {
  const closeButton = document.getElementById("close");
  closeButton.addEventListener("click", function () {
    chrome.extension.getViews({ type: "popup" })[0].close();
  });

  const url = "https://docwire-doctotext.p.rapidapi.com/extract_text";
  const doc = document.getElementById("resumeFile");
  doc.onchange = async () => {
    const selectedFile = doc.files[0];
    console.log("Selected file name:", selectedFile.name);
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("filename", selectedFile.name);
    data.append("page", "1");
    const options = {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": apikey,
        "X-RapidAPI-Host": "docwire-doctotext.p.rapidapi.com",
      },
      body: data,
    };
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      overallResume = result
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const optionss = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": APIKEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", function () {
    let value = document.getElementById("box").value;
    console.log("value: " + value);

    const query = encodeURIComponent(value);
    console.log("Encoded query:", query);
    const urlQuery = `https://jsearch.p.rapidapi.com/search?query=${query}`;
    fetch(urlQuery, optionss)
      .then((response) => response.json())
      .then(async (response) => {
        console.log(response);
        const jobDescription = response.data[0].job_description;
        const qualifications = response.data[0].job_highlights.Qualifications;
        const responsibilities =
          response.data[0].job_highlights.Responsibilities;
        console.log(jobDescription);
        console.log(qualifications);
        console.log(responsibilities);

        const response2 = await generateCoverLetter(jobDescription, qualifications, responsibilities, overallResume)
        const content = response2.choices[0].message.content;
        console.log(content)
        await generateAndDownloadPDF(content)
      })
      .catch((err) => console.error(err));
  });
});
closeButton.addEventListener("click", function () {
  chrome.extension.getViews({ type: "popup" })[0].close();
});


async function generateAndDownloadPDF(content) {
  const newWindow = window.open("", "", "width=600,height=600");
  newWindow.document.write(`<pre>${content}</pre>`);
  newWindow.document.close();

  await new Promise((resolve) => {
    newWindow.onload = resolve;
  });

  newWindow.print();

  setTimeout(() => {
    newWindow.close();
  }, 100);
}

async function generateCoverLetter(jobDescription, qualifications, responsibilities, overallResume) {

  const details = "Create a tailored cover letter that highlights the most relevant skills and experiences from this job description and resume. It should not be more than 500 worlds";
  const prompt = details + "Job description is " + jobDescription + "Qualification needed are " + qualifications + " responsibilities are " + responsibilities + " my resume is " + overallResume;

  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  };
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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", // Replace with your OpenAI API key
    },
    body: JSON.stringify(requestBody),
  });

  return response.json();
}
