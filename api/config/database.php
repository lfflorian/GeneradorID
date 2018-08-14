<?php
<<<<<<< HEAD
   // connect to mongodb
   $m = new MongoClient();
	
   echo "Connection to database successfully";
   // select a database
   $db = $m->mydb;
	
   echo "Database mydb selected";
=======
class Database{
    private $host = "localhost";
    private $db_name = "codigounico";
    private $username = "root";
    private $password = "";
    public $conn;

    public function getConnection(){
        $this->conn = null;

        try 
        {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch (PDOException $exception)
        {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }

}
>>>>>>> finalizado
?>