<?php

namespace App\DataFixtures;


use Faker\Factory;
use App\Entity\Article;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\String\Slugger\SluggerInterface;

use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{

    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher,private SluggerInterface $slugger)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager): void
    {

        $faker_factory = Factory::create('fr_FR');

        /********************/
        /********USERS*******/
        /********************/

        $userAdmin = new User();
        $userAdmin->setmail("admin");
        $userAdmin->setUsername("admin");
        $userAdmin->setLastName("admin");
        $userAdmin->setFirstName("admin");
        $userAdmin->setRoles(array('ROLE_ADMIN'));
        $userAdmin->setPassword($this->hasher->hashPassword($userAdmin, '1234'));

        $manager->persist($userAdmin);
        $manager->flush();

        for($i = 0; $i<10;$i++){
            $user[$i] = new User();
            $user[$i]->setmail($faker_factory->lastName() . $faker_factory->firstNameMale() . "@gmail.com" . $i);
            $user[$i]->setUsername($faker_factory->lastName() . $i);
            $user[$i]->setLastName($faker_factory->lastName() . $i);
            $user[$i]->setFirstName($faker_factory->firstNameMale() . $i);
            $user[$i]->setRoles(array('ROLE_USER'));
            $user[$i]->setPassword($this->hasher->hashPassword($user[$i], '1234'));
            $manager->persist($user[$i]);
            $manager->flush();
        }


        /***********************/
        /********ARTICLES*******/
        /***********************/

        for($i = 0; $i<10;$i++){
            $article[$i] = new Article();
            $article[$i]->setTitle("Title : " . $i);
            $article[$i]->setUser($userAdmin);

            // $user[$i]->setCreatedAt();
            // $user[$i]->setUpdatedAt();
            $article[$i]->setResume("Resume : " . $i);

            // setUser
            $manager->persist($article[$i]);
            $manager->flush();
        }

        $manager->flush();
    }
}
