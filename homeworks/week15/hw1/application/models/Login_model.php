<?php
    class Login_model extends CI_Model{
        public function __construct()
        {
            $this->load->database();
        }
        //找使用者
        public function findUserByEmail($user)
        {
            $query = $this->db->get_where('yuchun_hashusers', array('user' => $user));
            return ($query->num_rows()>0) ? true : false;
        }
        //驗證密碼
        public function vertifyUser($user, $password)
        {
            $query = $this->db->get_where('yuchun_hashusers', array('user' => $user));
            foreach ($query->result() as $row){
                if(password_verify($password, $row->password)){
                    return $row->nickname;
                }
            }
            return false;
        }
    }
?>