/**
  @file
    GitHub API function and logic.

  @copyright
    BSD 2-Clause License
    Copyright (c) 2022, Jason Lin (傑森哥) <jason40418@gmail.com>
    All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice,
       this list of conditions and the following disclaimer.

    2. Redistributions in binary form must reproduce the above copyright notice,
       this list of conditions and the following disclaimer in the documentation
       and/or other materials provided with the distribution.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
    AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
    FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
    DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
    SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
    CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
    OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
    OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 */

const GITHUB_API_URL   = 'https://api.github.com';
const GITHUB_ISSUE_API = '/search/issues';
const GITHUB_HEADER = {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `token ${GITHUB_TOKEN}`,
}

function get_pr_by_url (url) {
    let [status, data] = send_request ('GET', url, GITHUB_HEADER, async=false);
    let result = new Object ();

    if (status === STATUS_SUCCESS) {
        result = data;
    } else {
        console.log (`[ERROR] Fail to get the data! (status: ${status})`);
    }

    return result;
}


function query_open_pr_by_id (user_id) {
    let query  = `is:pr-is:merged+author:${user_id}&sort=updated&order=dsc`;
    let url    = `${GITHUB_API_URL}${GITHUB_ISSUE_API}?q=${query}`;
    let result = new Array ()

    let [status, data] = send_request ('GET', url, GITHUB_HEADER);

    if (status === STATUS_SUCCESS) {
        result = data.items;
    } else {
        console.log (`[ERROR] Fail to get the data! (status: ${status})`);
    }

    return result;
}

function query_closed_pr_by_id (user_id) {
    let query  = `is:pr+is:closed+author:${user_id}&sort=updated&order=dsc`;
    let url    = `${GITHUB_API_URL}${GITHUB_ISSUE_API}?q=${query}`;
    let result = new Array ()

    let [status, data] = send_request ('GET', url, GITHUB_HEADER);

    if (status === STATUS_SUCCESS) {
        result = data.items;
    } else {
        console.log (`[ERROR] Fail to get the data! (status: ${status})`);
    }

    return result;
}

function query_request_review_pr_by_id (user_id) {
    let query  = `is:pr+is:open+review-requested:${user_id}&sort=updated&order=dsc`;
    let url    = `${GITHUB_API_URL}${GITHUB_ISSUE_API}?q=${query}`;
    let result = new Array ()

    let [status, data] = send_request ('GET', url, GITHUB_HEADER);

    if (status === STATUS_SUCCESS) {
        result = data.items;
    } else {
        console.log (`[ERROR] Fail to get the data! (status: ${status})`);
    }

    return result;
}

function query_reviewed_review_pr_by_id (user_id) {
    let query  = `is:pr+reviewed-by:${user_id}&sort=updated&order=dsc`;
    let url    = `${GITHUB_API_URL}${GITHUB_ISSUE_API}?q=${query}`;
    let result = new Array ()

    let [status, data] = send_request ('GET', url, GITHUB_HEADER);

    if (status === STATUS_SUCCESS) {
        result = data.items;
    } else {
        console.log (`[ERROR] Fail to get the data! (status: ${status})`);
    }

    return result;
}

async function async_get_pr_detail (data) {
    let pull_request_array = new Array ()
    let pr_result = await Promise.all (
        data.map ((value, key) => {
            //
            // Do the async requests to get all PR information at same time.
            // So the result for this promise is not the corrected one.
            //
            let url = value.pull_request.url;
            pull_request_array.push (url)
            return send_request ('GET', url, GITHUB_HEADER, data={}, async=true);
        })
    );

    return pull_request_array
}
