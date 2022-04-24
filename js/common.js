/**
  @file
    Common Library.

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
const STATUS_SUCCESS = 200

var gloabl_xhr_request   = 0;
var gloabl_xhr_response  = 0;
var global_response_data = {};  // Key is API url this should be the unique

function send_request (type, url, headers, data={}, async=false) {
    let ajax = $.ajax({
        type: type, 
        url: url,
        headers: headers,
        data: data,
        dataType: "json",
        async: async,
        beforeSend: (xhr) => {
            globalThis.gloabl_xhr_request += 1;
            console.log (`[TRACE] Before send the XHR`)
        },
        complete: (xhr, status) => {
            globalThis.gloabl_xhr_response += 1;
            globalThis.global_response_data[url] = [
                xhr.status, xhr.responseJSON
            ]
            console.log (`[TRACE] ${url} Done`)
        }
    });

    return [ajax.status, ajax.responseJSON]
}

function update_array_promise_to_table_row (promise, table_id, html_content_func) {

    promise.then((result)=> {
        let html_content = ''

        $.each (result, (key, value) => {
            let [status, response] = global_response_data[value];

            if (status == STATUS_SUCCESS && Object.keys(response).length !== 0) {
                table_row = html_content_func (response)
                html_content += table_row;
            }
        });

        $(table_id).html (html_content);
    })    
}

function check_all_request_get_response () {
    //
    // We need to ensure all the request had been resolved then to update the table.
    //
    console.log (`[INFO] Request: ${globalThis.gloabl_xhr_request}; Response: ${globalThis.gloabl_xhr_response}`);
    if (globalThis.gloabl_xhr_request != globalThis.gloabl_xhr_response) {
        return false;
    } else {
        return true;
    }
}