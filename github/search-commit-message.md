# Stack Overflow question:

[How to find a commit using GitHub API](https://stackoverflow.com/questions/70977951/how-can-i-find-a-commit-which-i-searched-on-github-api/70993849)

[![](https://badgen.net/badge/Run%20this%20/README/5B3ADF?icon=https://runme.dev/img/logo.svg)](https://runme.dev/api/runme?repository=https%3A%2F%2Fgithub.com%2Fdegrammer%2Fstack-overflow-answers.git&fileToOpen=github/search-commit-message.md)

# Answer

You can use the search commit API. It's flexible enough to search by different qualifiers, like committer username, author, repository, organization, etc.

Take into account, there is a time limit for running your search, in case you exceed the time limit, the API returns the matches that were already found prior to the timeout, and the response has the incomplete_results property set to true, read more about it here

Here's an example using Octokit that searches inside GitHub org the test string

```js { readonly=true }
const octokit = new Octokit()
const text = 'test';
const org = 'github';
const query = `${text} org:${org}`;
const searchResult = await octokit.rest.search.commits({
    q: query
});

// In case there is a timeout running the query, you can use incomplete_results to check if there are likely more results
// for your query, read more here https://docs.github.com/en/rest/reference/search#timeouts-and-incomplete-results
const { items, total_count } = searchResult.data;
console.log(items.map(commit => commit.commit));
console.log(`Found ${total_count} commits for ${text} at GitHub org called ${org}`)
```

## Run the code

```sh
npm i
node code/search-commit-message.js
```
