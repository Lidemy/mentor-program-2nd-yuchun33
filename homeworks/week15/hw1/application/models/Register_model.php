<?php
    class Register_model extends CI_Model{
        public function __construct()
        {
            $this->load->database();
        }
        //新增使用者
        public function createUser($nickname, $userEmail, $password)
        {
            $hash_password = password_hash($password, PASSWORD_DEFAULT);
            echo $hash_password;
            $newUser = array(
                'user' => $userEmail,
                'password' => $hash_password,
                'nickname' => $nickname
             );
            $query = $this->db->insert('yuchun_hashusers', $newUser);
        }
    }
?>