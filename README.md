# Node.js Steam-api


# Games

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/steam | `GET` | Empty | List all games. |
| /api/steam | `POST` | {'title':'gta5', 'category':'open world', 'country':'USA', year:2013, developer:"id", game_point: 9 } | Create a new game. |
| /api/steam/:title | `GET` | Empty | Get a game. |
| /api/steam/:title | `DELETE` | Empty | Delete a game. |
| /api/steam/top10 | `GET` | Empty | Get the top 10 games. |

# Index

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /register | `POST` | { username: 'foo', password:'1234' } | Create a new user. |
| /authenticate | `POST` | { username: 'foo', password:'1234' } | Generate a token. |

