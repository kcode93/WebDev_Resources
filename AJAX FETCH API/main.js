function getData(method, url){
        return new Promise(function(resolve, reject){
            var request = new XMLHttpRequest();
            request.open(method, url);
            //if request is sucssesful 
            request.onload = function(){
                if(this.status >= 200 && this.status < 300){
                    resolve(request.response);
                }else{
                    reject({
                        status: this.status,
                        statusText: this.statusText
                    });
                }
            };
            //if request fails
            request.onerror = function(){
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            };
            request.send();
        });
    }

    getData('GET', 'http://jsonplaceholder.typicode.com/users').then(function(data){
        let users = JSON.parse(data);
        let output = "";
        for(let user of users){
            output += `
                <li>
                    <h3>${user.id}</h3>
                    <p>${user.name}</p>
                    <p>${user.username}</p>
                    <p>${user.email}</p>
                </li>
            `;
        }
        document.getElementById('API_data').innerHTML = output;
    }).catch(function(err){
        console.log(err);
    });
