nodejs-vs-vertx
===============

Simple and naive Node.js vs vert.x benchmark. I've written it to check if there's any significant performance difference between Node.js (which is getting more popular than even before and undoubtedly more stable and mature) and new kid on the block -- vert.x (which shares the asynchronous and message-oriented philosophy with Node.js). I'm playing with Node since v0.2, this benchmark took me 2 hours of work mostly due to trial-and-error approach to vert.x, so the code may not be the most optimized and sophisticated.

Node.js server uses Restify framework and Mongoose ORM. Vert.x is a complete stack so there's no need for external modules. The database is MongoDB.

Testing environment
-------------------

* Processor: Intel(R) Core(TM) i5-2410M CPU @ 2.30GHz
* Memory: 4GB DDR3 SDRAM @ 1333MHz (1725MB used)
* Hard drive: KINGSTON SSD SVP100S
* Operating System: Ubuntu 11.04

Yes. It's a laptop.

Fairness considerations
-----------------------

Restify adds it's own headers such as X-Response-Time, Content-MD5, X-Request-Id, Date and so on. To be fair I removed unnecessary calculations from Restify and added some of them to vert.x code so that both servers return the same set of headers and perform (more or less) the same calculations. I got rid of MD5 response hash because it took about 40ms to calculate it using JavaScript function (Restify uses OpenSSL for that).

Benchmark results
-----------------

Benchmarks were performed using Siege. All test data is generated on the fly.

### Posting and selecting from database

Request adds a random JSON document to database:

    author: String(16)
    date: Date
    content: String(160)

and gets 100 already stored documents in response.

Benchmarking command: siege -c100 -d1 -r100 http://localhost:1337/post

<table>
  <tr>
    <th></th>
    <th>Node.js (default)</th>
    <th>vert.x (default)</th>
  </tr>
  <tr>
    <td>Transactions</td>
    <td>10000 hits</td>
    <td>10000 hits</td>
  </tr>
  <tr>
    <td>Availability</td>
    <td>100.00 %</td>
    <td>100.00 %</td>
  </tr>
  <tr>
    <td>Elapsed time</td>
    <td>188.38 secs</td>
    <td>64.76 secs</td>
  </tr>
  <tr>
    <td>Data transferred</td>
    <td>254.22 MB</td>
    <td>280.63 MB</td>
  </tr>
  <tr>
    <td>Response time</td>
    <td>1.32 secs</td>
    <td>0.03 secs</td>
  </tr>
  <tr>
    <td>Transaction rate</td>
    <td>53.08 trans/sec</td>
    <td>154.42 trans/sec</td>
  </tr>
  <tr>
    <td>Throughput</td>
    <td>1.35 MB/sec</td>
    <td>4.33 MB/sec</td>
  </tr>
  <tr>
    <td>Concurrency</td>
    <td>70.22</td>
    <td>4.83</td>
  </tr>
  <tr>
    <td>Successful transactions</td>
    <td>10000</td>
    <td>10000</td>
  </tr>
  <tr>
    <td>Failed transactions</td>
    <td>0</td>
    <td>0</td>
  </tr>
  <tr>
    <td>Longest transaction</td>
    <td>2.31</td>
    <td>0.01</td>
  </tr>
  <tr>
    <td>Shortest transaction</td>
    <td>0.70</td>
    <td>0.00</td>
  </tr>
</table>



Fun facts
---------

* Naming your vert.x application file 'vertx.js' is a bad idea.
* Vert.x crashed with 'java.lang.OutOfMemoryError: GC overhead limit exceeded' exception because of the MongoDB socket timeouts.