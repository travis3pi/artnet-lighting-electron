<h1>VR Club Lighting / QLab Control</h1>

<h3>QLab Control</h3>
<hr>

<p>The QLab control system is based on two different types of network protocols: OSC and Socket.IO. The OSC is a standard protocol that many show control systems in the theatre space use. We are using QLab software to generate the OSC commands which in turn will trigger events and update values in the Unity project while running. In order to create a fully distributed system we needed to capture the OSC packets as they are not internet friendly (UDP vs TCP) and convert them into Socket.IO. There is a client Docker container that captures these OSC commands, converts them to Socket.IO and pushes updates to out dedicated cloud server.</p>

<br>
<p>To run the client QLab Docker container use the command below:</>
<code>docker run -p "53001:53001/udp" -d travis3pi/vr-club-qlab:{tag}</code>
<p>Note the {tag} in the command above should be populated with the latest version of the software (example: 0.0.2)</p>
<p>The current URL for the distributed network server is: http://artnet-server-vr-club.tmkinteractive.com:3000 which handles both the lighting and QLab control messages.</p>
