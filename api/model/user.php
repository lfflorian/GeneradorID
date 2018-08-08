<?php
class Product {
    private $conn;
    private $table_name = "users";

    public $id;
    public $nombre;
    public $codigo;

    public function __construct($db){
        $this->conn = $db;
    }

    function create(){
 
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    name=:name, code=:code";
     
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->code=htmlspecialchars(strip_tags($this->code));
     
        // bind values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":code", $this->code);
        
        // execute query
        if($stmt->execute()){
            return true;
        }
     
        return false;
         
    }

    function readOne(){
        $query = $query = "SELECT * FROM " . $this->table_name . " WHERE code = ?";
        $stmt = $this->conn->prepare( $query );
     
        // bind id of product to be updated
        $stmt->bindParam(1, $this->id);
     
        // execute query
        $stmt->execute();
     
        // get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
     
        // set values to object properties
        $this->description = $row['id'];
        $this->name = $row['name'];
        $this->price = $row['code'];
    }

    public function count(){
        $query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name . "";
     
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
     
        return $row['total_rows'];
    }
}
?>