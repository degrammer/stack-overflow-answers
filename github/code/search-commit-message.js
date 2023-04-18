import { Octokit } from "octokit";

(async () => {
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
})()