## Packages

### php packages
Install with composer
`composer install`

### js packages
Install with npm
`npm update`


## php extensions needed:


### enable the following in php.ini:
`extension_dir = "ext"` //if windows <br>
`extension=mbstring` <br>
`extension=zip`<br>
`extension=fileinfo`<br>
`extension=openssl`<br>


### Add the necessary PDO extensions required by laravel to use SQL Server 2017+ 
`extension=sqlsrv_82_nts_x64`<br>
`extension=pdo_sqlsrv_82_nts_x64`<br>


### Database
Database is configured to connect to MS SQL server. The correct drives must be installed to support laravels usage of PDO. See https://www.php.net/manual/en/ref.pdo-sqlsrv.php to get drivers set up. 

For testing I use an instance of SQL server express. https://www.microsoft.com/en-ca/sql-server/sql-server-downloads
Authenticated with a trusted connection
.env file example for my home pc. Not this file will not exist on a fresh clone but can be copied from .env.example and then changed. <br>
````
DB_CONNECTION=sqlsrvHome
DB_HOST=DESKTOP-HS5T881
DB_PORT=null
DB_DATABASE=Laravel //change this to whatever database you want to use
DB_USERNAME=
DB_PASSWORD=
````
By setting DB_CONNECTION to sqlsrvHome, the settings for the database connection will be created from the information provided in the ‘connections’ array within config/database.php. 
For development, I use the following settings, please note these must be changed for production. 

````
    'driver' => 'sqlsrv',
    'url' => env('DATABASE_URL'),
    'host' => env('DB_HOST', 'localhost'),
    'port' => env('DB_PORT', '1433'),
    'database' => env('DB_DATABASE', 'forge'),
    'charset' => 'utf8',
    'prefix' => '',
    'prefix_indexes' => true,
    'trusted_connection' => true,
    'trust_server_certificate' => env('DB_TRUST_SERVER_CERTIFICATE', 'true'),
````

