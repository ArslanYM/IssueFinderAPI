const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

//* for getting first issues 
const getGoodFirstIssues = async (req, res) => {
  const org = req.params.org;
  const repo = req.params.repo;

  try {
    const repositoryInfo = await scrapeRepositoryInfo(org, repo);
    const issues = await scrapeAllGoodFirstIssues(org, repo);
    res.json({ repositoryInfo, issues });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while scraping GitHub' });
  }
};

async function scrapeRepositoryInfo(org, repo) {
  const url = `https://github.com/${org}/${repo}`;
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const repoName = `${repo}`
  const orgName = `${org}`


  return { repoName, orgName};
}


async function scrapeAllGoodFirstIssues(org, repo) {
  const issues = [];

  let hasNextPage = true;
  let page = 1;

  while (hasNextPage) {
    const url = `https://github.com/${org}/${repo}/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22&page=${page}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const currentPageIssues = scrapeGoodFirstIssues($);
    issues.push(...currentPageIssues);

    const nextPageLink = $('.pagination a[rel="next"]').attr('href');
    hasNextPage = nextPageLink ? true : false;
    page++;

    // Delay for a short period between page requests to avoid overwhelming the server
    await delay(1000);
  }

  return issues;
}

function scrapeGoodFirstIssues($) {
  const issues = [];
  $('.js-navigation-container.js-active-navigation-container .Box-row').each((index, element) => {
    const title = $(element).find('.h4').text().trim();
    const url = 'https://github.com' + $(element).find('.Link--primary').attr('href');
    const status = $(element).find('.State').text().trim();
    // const labels = $(element).find('.labels .Label').map((index, label) => $(label).text().trim()).get();
    const description = $(element).find('.markdown-title').next().text().trim();

    issues.push({ title, url, status, description });
  });
  return issues;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


//* for getting help wanted issues

const getHelpWantedIssues = async (req, res) => {
    const org = req.params.org;
    const repo = req.params.repo;
  
    try {
      const repositoryInfo = await scrapeRepositoryInfo(org, repo);
      const issues = await scrapeAllHelpWantedIssues(org, repo, 'help wanted');
      res.json({ repositoryInfo, issues });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while scraping GitHub' });
    }
  };
  
  
  async function scrapeAllHelpWantedIssues(org, repo, label) {
    const issues = [];
  
    let hasNextPage = true;
    let page = 1;
  
    while (hasNextPage) {
      const url = `https://github.com/${org}/${repo}/issues?q=is%3Aissue+is%3Aopen+label%3A%22${encodeURIComponent(label)}%22&page=${page}`;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
  
      const currentPageIssues = scrapeHelpWantedIssues($);
      issues.push(...currentPageIssues);
  
      const nextPageLink = $('.pagination a[rel="next"]').attr('href');
      hasNextPage = nextPageLink ? true : false;
      page++;
  
      // Delay for a short period between page requests to avoid overwhelming the server
      await delay(1000);
    }
  
    return issues;
  }
  
  function scrapeHelpWantedIssues($) {
    const issues = [];
    $('.js-navigation-container.js-active-navigation-container .Box-row').each((index, element) => {
      const title = $(element).find('.h4').text().trim();
      const url = 'https://github.com' + $(element).find('.Link--primary').attr('href');
      const status = $(element).find('.State').text().trim();
      // const labels = $(element).find('.labels .Label').map((index, label) => $(label).text().trim()).get();
      const description = $(element).find('.markdown-title').next().text().trim();
  
      issues.push({ title, url, status, description });
    });
    return issues;
  }


//* for getting first timers only 


const getFirstTimersOnly = async (req, res) => {
    const org = req.params.org;
    const repo = req.params.repo;
  
    try {
      const repositoryInfo = await scrapeRepositoryInfo(org, repo);
      const issues = await scrapeAllFirstTimersIssues(org, repo, 'first-timers-only');
      res.json({ repositoryInfo, issues });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while scraping GitHub' });
    }
};
  
  async function scrapeAllFirstTimersIssues(org, repo, label) {
    const issues = [];
  
    let hasNextPage = true;
    let page = 1;
  
    while (hasNextPage) {
      const url = `https://github.com/${org}/${repo}/issues?q=is%3Aissue+is%3Aopen+label%3A%22${encodeURIComponent(label)}%22&page=${page}`;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
  
      const currentPageIssues = scrapeFirstTimersIssues($);
      issues.push(...currentPageIssues);
  
      const nextPageLink = $('.pagination a[rel="next"]').attr('href');
      hasNextPage = nextPageLink ? true : false;
      page++;
  
      // Delay for a short period between page requests to avoid overwhelming the server
      await delay(1000);
    }
  
    return issues;
  }
  
  function scrapeFirstTimersIssues($) {
    const issues = [];
    $('.js-navigation-container.js-active-navigation-container .Box-row').each((index, element) => {
      const title = $(element).find('.h4').text().trim();
      const url = 'https://github.com' + $(element).find('.Link--primary').attr('href');
      const status = $(element).find('.State').text().trim();
      const labels = $(element).find('.labels .Label').map((index, label) => $(label).text().trim()).get();
      const description = $(element).find('.markdown-title').next().text().trim();
  
      issues.push({ title, url, status, labels, description });
    });
    return issues;
  }

  //* for getting all issues 
const getAllIssues = async (req, res) => {
    const org = req.params.org;
    const repo = req.params.repo;
  
    try {
      const repositoryInfo = await scrapeRepositoryInfo(org, repo);
      const issues = await scrapeCompleteIssues(org, repo);
      res.json({ repositoryInfo, issues });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while scraping GitHub' });
    }
  };

  
  async function scrapeCompleteIssues(org, repo) {
    const issues = [];
  
    let hasNextPage = true;
    let page = 1;
  
    while (hasNextPage) {
      const url = `https://github.com/${org}/${repo}/issues?page=${page}`;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
  
      const currentPageIssues = scrapeAllIssues($);
      issues.push(...currentPageIssues);
  
      const nextPageLink = $('.pagination a[rel="next"]').attr('href');
      hasNextPage = nextPageLink ? true : false;
      page++;
  
      // Delay for a short period between page requests to avoid overwhelming the server
      await delay(1000);
    }
  
    return issues;
  }
  
  function scrapeAllIssues($) {
    const issues = [];
    $('.js-navigation-container.js-active-navigation-container .Box-row').each((index, element) => {
      const title = $(element).find('.h4').text().trim();
      const url = 'https://github.com' + $(element).find('.Link--primary').attr('href');
      const status = $(element).find('.State').text().trim();
      // const labels = $(element).find('.labels .Label').map((index, label) => $(label).text().trim()).get();
      const description = $(element).find('.markdown-title').next().text().trim();
  
      issues.push({ title, url, status, description });
    });
    return issues;
  }
  

module.exports = {
  getGoodFirstIssues,
  getHelpWantedIssues,
  getFirstTimersOnly,
  getAllIssues
}