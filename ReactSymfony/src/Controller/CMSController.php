<?php

namespace App\Controller;

use App\Form\UserFormType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use App\Repository\ArticleRepository;
use App\Repository\BlocRepository;
use Doctrine\Common\Collections\ArrayCollection;
use App\Form\ArticleType;

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
    
        $crea_form = $this->createForm(UserFormType::class, $user, ['method' => 'POST', 'submit label' => 'Enregistrer les modifications']);
    
        $crea_form->handleRequest($request);
    
        if ($user != null) {
            if ($crea_form->isSubmitted() && $crea_form->isValid()) {
                $entityManager->persist($user);
                $entityManager->flush();
    
                $this->addFlash('success', 'Votre user a bien été modifié avec succès !');
                return $this->redirectToRoute('app_home');
            }
        }
    
        return $this->render('cms/userEdit.html.twig', [
            'crea_form' => $crea_form->createView(),
            'user' => $user, // Pass the user variable to the template
        ]);
    }
    

    #[Route('/article', name: 'app_article')]
    public function build(Security $security): Response
    {
        $user = $security->getUser();
        if(!$user) $user = null;

        return $this->render('cms/article.html.twig', [
            'controller_route' => 'app_article',
            'user' => $user
        ]);
    }


    // ADD TO UPDATE BLOCS
    // #[Route('/article/edit/{id}', name: 'app_article_edit', methods:['GET','POST'])]
    // public function ArticleEdit(Request $request, int $id, ArticleRepository $articleRepository,BlocRepository $blocRepository, EntityManagerInterface $entityManager)
    // {
    //     $article = $articleRepository->findOneBy(['id' => $id]);
    //     $blocs = $blocRepository->findBy(['id' => $id]);

    //     if (!$article) {
    //         throw $this->createNotFoundException('Article not found');
    //     }

    //     $originalBlocs = new ArrayCollection();
    //     dd($originalBlocs);

    //     // Store the original blocs to check for removal later
    //     foreach ($article->getBlocs() as $bloc) {
    //         $originalBlocs->add($bloc);
    //     }


    //     $crea_form = $this->createForm(UserFormType::class,$article,['method' => 'POST', 'submit label' => 'Enregistrer les modifications']);

    //     $crea_form->handleRequest($request);

    //     if ($article != null) {
    //         if ($crea_form->isSubmitted() && $crea_form->isValid()) {
    //             $entityManager->persist($article);
    //             $entityManager->flush();

    //             $this->addFlash('success', 'Votre article a bien été modifié avec succès !');
    //             return $this->redirectToRoute('app_home');
    //         }
    //     }

    //     return $this->render('cms/articleEdit.html.twig',[
    //         'crea_form' => $crea_form->createView()
    //     ]);
    // }




    #[Route('/article/edit/{id}', name: 'app_article_edit', methods: ['GET', 'POST'])]
    public function articleEdit(Request $request, int $id, ArticleRepository $articleRepository, EntityManagerInterface $entityManager)
    {
        $article = $articleRepository->find($id);

        if (!$article) {
            throw $this->createNotFoundException('Article not found');
        }

        $originalBlocs = new ArrayCollection();

        // Store the original blocs to check for removal later
        foreach ($article->getBlocs() as $bloc) {
            $originalBlocs->add($bloc);
        }

        $form = $this->createForm(ArticleType::class, $article);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // Remove blocs that were removed in the form
            foreach ($originalBlocs as $bloc) {
                if (!$article->getBlocs()->contains($bloc)) {
                    $entityManager->remove($bloc);
                }
            }

            $entityManager->flush();

            $this->addFlash('success', 'Your article has been successfully updated!');
            return $this->redirectToRoute('app_home');
        }

        return $this->render('cms/articleEdit.html.twig', [
            'form' => $form->createView(),
        ]);
    }

}
