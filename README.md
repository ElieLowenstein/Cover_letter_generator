# Automated Cover Letter Generator Web Extension

**Authors:** Elie Lowenstein, Harsh Gandhi, Kidus Tilahun

Welcome to the Automated Cover Letter Generator Web Extension! This extension is designed to streamline your job application process by generating personalized cover letters based on the company's job description and your resume. No more spending hours on writing cover letters – let our extension handle the heavy lifting for you.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Keys](#api-keys)

## Introduction

Are you tired of crafting custom cover letters for every job application? Our Automated Cover Letter Generator Web Extension is here to help. With just a few clicks, you can input the company name, job description, and attach your resume in PDF or DOCX format. Our extension will then generate a tailored cover letter that highlights your relevant experiences and skills, making your job application process more efficient and effective.

## Installation

Since this extension is currently in developer mode and not available on the Chrome Web Store, you can follow these steps to install and use it:

1. Clone this repository to your local machine:

   git clone https://github.com/ElieLowenstein/Cover_letter_generator.git

3. Open your Chrome browser and navigate to `chrome://extensions/`.

4. Enable "Developer mode" using the toggle switch located at the top-right corner of the page.

5. Click the "Load unpacked" button and select the directory where you cloned this repository.

6. The extension will now be installed and its icon will appear in your browser toolbar.

7. When you want to use the extension, click on its icon to access the interface.

Please note that developer mode extensions are intended for testing and development purposes. 


## Usage

1. Click on the extension icon in your browser.
2. Input the company name and job description.
3. Attach your resume in PDF or DOCX format.
4. Click the "Generate Cover Letter" button.
5. The generated cover letter will be displayed on the screen.

## Configuration

No configuration is required to use the extension. It's designed to be user-friendly and intuitive.

## API Keys

This extension utilizes the following APIs:

- [OpenAI API](https://openai.com/blog/openai-api) for generating cover letter content.
- [RapidAPI for Job Descriptions](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch) to fetch relevant job descriptions.
- [RapidAPI for Reading Resumes](https://rapidapi.com/docwire-docwire-default/api/docwire-doctotext) to extract text from attached resumes.

To use this extension effectively, you need to obtain API keys for the above services. Follow the documentation of each API provider to acquire the necessary keys.

We hope this extension makes your job application process smoother and more successful. Happy job hunting!
