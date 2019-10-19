function easyHTTP() {
  this.http = new XMLHttpRequest();
}

// GET

easyHTTP.prototype.get = function(url, callback) {
  this.http.open('GET', url, true);
  let self1 = this;
  this.http.onload = function() {
    if (self1.http.status === 200) {
      callback(null, self1.http.responseText);
    } else {
      callback('Error: ' + self1.http.status);
    }
  }

  this.http.send();
}


// POST
easyHTTP.prototype.post = function(url, body, callback) {

  this.http.open('POST', url, true);
  this.http.setRequestHeader('Content-type', 'application/json');
  let self2 = this;
  this.http.onload = function () {
    callback(null, self2.http.responseText);
  };

  this.http.send(JSON.stringify(body));

}

// PUT

easyHTTP.prototype.put = function(url, body, callback) {

  this.http.open('PUT', url, true);
  this.http.setRequestHeader('Content-type', 'application/json');
  let self3 = this;
  this.http.onload = function () {
    callback(null, self3.http.responseText);
  };

  this.http.send(JSON.stringify(body));

}

// DELETE

easyHTTP.prototype.delete = function(url, callback) {
  this.http.open('DELETE', url, true);
  let self1 = this;
  this.http.onload = function() {
    if (self1.http.status === 200) {
      callback(null, 'Posts deleted');
    } else {
      callback('Error: ' + self1.http.status);
    }
  }

  this.http.send();
}
