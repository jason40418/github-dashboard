/**
  @file
    Main logic file for send the API and update the information into table.

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

function url (url) {
    window.open(url, '_blank');
}

function get_html_row_data_self_open_pr (pr_data) {
    let pr_num      = pr_data.number;
    let pr_link     = pr_data.html_url;
    let title       = pr_data.title;
    let author      = pr_data.user.login;
    let author_link = pr_data.user.html_url;
    let base_branch = pr_data.base.ref;
    let update_date = pr_data.updated_at;
    let state       = pr_data.state;
    let repo        = pr_data.base.repo.name;
    let repo_link   = pr_data.base.repo.html_url;

    let table_row = `
        <tr>
            <th scope="row" class="clickable-td" href="${pr_link}">${pr_num}</th>
            <td class="clickable-td" href="${pr_link}">${title}</td>
            <td class="clickable-td" href="${repo_link}">${repo}</td>
            <td class="clickable-td" href="${repo_link}/tree/${base_branch}">${base_branch}</td>
            <td>${state}</td>
            <td>${update_date}</td>
            <td class="clickable-td" href="${author_link}">${author}</td>
        </tr>
        `
    
    return table_row;
}

function get_html_row_data_self_closed_pr (pr_data) {
  let pr_num      = pr_data.number;
  let pr_link     = pr_data.html_url;
  let title       = pr_data.title;
  let author      = pr_data.user.login;
  let author_link = pr_data.user.html_url;
  let base_branch = pr_data.base.ref;
  let update_date = pr_data.updated_at;
  let state       = pr_data.state;
  let repo        = pr_data.base.repo.name;
  let repo_link   = pr_data.base.repo.html_url;

  let table_row = `
        <tr>
            <th scope="row" class="clickable-td" href="${pr_link}">${pr_num}</th>
            <td class="clickable-td" href="${pr_link}">${title}</td>
            <td class="clickable-td" href="${repo_link}">${repo}</td>
            <td class="clickable-td" href="${repo_link}/tree/${base_branch}">${base_branch}</td>
            <td>${state}</td>
            <td>${update_date}</td>
            <td class="clickable-td" href="${author_link}">${author}</td>
        </tr>
        `
  
  return table_row;
}

function get_html_row_data_request_review_pr (pr_data) {
  let pr_num      = pr_data.number;
  let pr_link     = pr_data.html_url;
  let title       = pr_data.title;
  let author      = pr_data.user.login;
  let author_link = pr_data.user.html_url;
  let base_branch = pr_data.base.ref;
  let update_date = pr_data.updated_at;
  let state       = pr_data.state;
  let repo        = pr_data.base.repo.name;
  let repo_link   = pr_data.base.repo.html_url;

  let table_row = `
        <tr>
            <th scope="row" class="clickable-td" href="${pr_link}">${pr_num}</th>
            <td class="clickable-td" href="${pr_link}">${title}</td>
            <td class="clickable-td" href="${repo_link}">${repo}</td>
            <td class="clickable-td" href="${repo_link}/tree/${base_branch}">${base_branch}</td>
            <td>${state}</td>
            <td>${update_date}</td>
            <td class="clickable-td" href="${author_link}">${author}</td>
        </tr>
        `
  
  return table_row;
}

$(document).on('click', '.clickable-td', function () {
  let url = $(this).attr('href');
  window.open(url, '_blank');
});