## php extensions needed:


### enable the following in php.ini:
`extension_dir = "ext"` //if windows
`extension=mbstring`
`extension=zip`
`extension=fileinfo`
`extension=openssl`


### Add the necessary PDO extensions required by laravel to use SQL Server 2017+ 
`extension=sqlsrv_82_nts_x64`
`extension=pdo_sqlsrv_82_nts_x64`

