nodejs-vs-vertx
===============

Simple and naive Node.js vs vert.x benchmark. I've written it to check if there's any significant performance difference between Node.js (which is getting more popular than even before and undoubtedly more stable and mature) and new kid on the block -- vert.x (which shares the asynchronous and message-oriented philosophy with Node.js). I'm playing with Node since v0.2, this benchmark took me 2 hours of work mostly due to trial-and-error approach to vert.x, so the code may not be the most optimized and sophisticated.

Node.js server uses Restify framework and Mongoose ORM. Vert.x is a complete stack so there's no need for external modules. The database is MongoDB.

Testing environment
-------------------

* Processor: Intel(R) Core(TM) i5-2410M CPU @ 2.30GHz
* Memory: 4GB DDR3 SDRAM @ 1333MHz (1725MB used)
* KINGSTON SSD SVP100S
* Operating System: Ubuntu 11.04

Yes. It's a laptop.

Fairness considerations
-----------------------

Restify adds it's own headers such as X-Response-Time, Content-MD5, X-Request-Id, Date and so on. To be fair I removed unnecessary calculations from Restify and added some of them to vert.x code so that both servers return the same set of headers and perform the same calculations. I got rid of MD5 response hash because it took about 40ms to calculate it using JavaScript function.

In order to warmup V8/JVM the first benchmark pass is ignored.