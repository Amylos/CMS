<?php

namespace App\Controller;

use App\Form\UserFormType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Bundle\SecurityBundle\Security;

class CMSController extends AbstractController
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    #[Route('/', name: 'app')]
    public function index(): Response
    {
        return $this->render('cms/root.html.twig', [
            'controller_route' => 'app',
        ]);
    }

    #[Route('/home', name: 'app_home')]
    public function home(Security $security): Response
    {

        $user = $security->getUser();
        if(!$user) $user = null;

        return $this->render('cms/home.html.twig', [
            'controller_route' => 'app_home',
            'user' => $user
        ]);
    }


    #[Route('/user', name: 'app_user')]
    public function User(): Response
    {

        return $this->render('cms/home.html.twig', [
            'controller_route' => 'app_user'
        ]);
    }


    #[Route('/user/edit/{id}', name: 'app_user_edit', methods:['GET','POST'])]
    public function userEdit(Request $request, int $id, UserRepository $repository, EntityManagerInterface $entityManager)
    {
        $user = $repository->findOneBy(['id' => $id]);

        $crea_form = $this->createForm(UserFormType::class,$user,['method' => 'POST', 'submit label' => 'Enregistrer les modifications']);

        $crea_form->handleRequest($request);

        if ($user != null) {
            if ($crea_form->isSubmitted() && $crea_form->isValid()) {
                $entityManager->persist($user);
                $entityManager->flush();

                $this->addFlash('success', 'Votre ingrédient a bien été modifié avec succès !');
                return $this->redirectToRoute('app_home');
            }
        }

        return $this->render('cms/userEdit.html.twig',[
            'crea_form' => $crea_form->createView()
        ]);
    }

    #[Route('/article', name: 'app_article')]
    public function build(): Response
    {
        $users = $this->userRepository->findAllUsers();

        return $this->render('cms/article.html.twig', [
            'controller_route' => 'app_article',
        ]);
    }


}
