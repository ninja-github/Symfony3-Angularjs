<?php

namespace PostBundle\Controller;

use PostBundle\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    
    /**
     * @Route("/api/posts",name="list_posts")
     * @Method({"GET"})
     */

    public function listPost()
    {
        $posts=$this->getDoctrine()->getRepository(Post::class)->findAll();

        if (!count($posts)){
            $response=array(

                'code'=>1,
                'message'=>'No posts found!',
                'errors'=>null,
                'result'=>null

            );
            return new JsonResponse($response, Response::HTTP_NOT_FOUND);
        }


        $data=$this->get('jms_serializer')->serialize($posts,'json');

        $response=array(

            'code'=>0,
            'message'=>'success',
            'errors'=>null,
            'result'=>json_decode($data)

        );
        return new JsonResponse($response,200);
    }

    /**
     * @Route("/api/posts/{id}",name="show_post")
     * @Method({"GET"})
     */
    public function showPost($id)
    {
        $post=$this->getDoctrine()->getRepository(Post::class)->find($id);

        if (empty($post)){
            $response=array(
                'code'=>1,
                'message'=>'post not found',
                'error'=>null,
                'result'=>null
            );
            return new JsonResponse($response, Response::HTTP_NOT_FOUND);
        }

        $data=$this->get('jms_serializer')->serialize($post,'json');

        $response=array(

            'code'=>0,
            'message'=>'success',
            'errors'=>null,
            'result'=>json_decode($data)

        );
        return new JsonResponse($response,200);
    }


    /**
     * @param Request $request
     * @return JsonResponse
     * @Route("/api/posts",name="create_post")
     * @Method({"POST"})
     */
    public function createPost(Request $request)
    {

        $data=$request->getContent();

        $post=$this->get('jms_serializer')->deserialize($data,Post::class,'json');

        $em=$this->getDoctrine()->getManager();
        $em->persist($post);
        $em->flush();

        $response=array(

            'code'=>0,
            'message'=>'Post created!',
            'errors'=>null,
            'result'=>null
        );
        return new JsonResponse($response,Response::HTTP_CREATED);
    }

    /**
     * @param Request $request
     * @param $id
     * @Route("/api/posts/{id}",name="update_post")
     * @Method({"PUT"})
     * @return JsonResponse
     */
    public function updatePost(Request $request,$id)
    {

        $post=$this->getDoctrine()->getRepository(Post::class)->find($id);

        if (empty($post))
        {
            $response=array(

                'code'=>1,
                'message'=>'Post Not found !',
                'errors'=>null,
                'result'=>null

            );
            return new JsonResponse($response, Response::HTTP_NOT_FOUND);
        }

        $body=$request->getContent();


        $data=$this->get('jms_serializer')->deserialize($body,Post::class,'json');

        $post->setTitle($data->getTitle());
        $post->setDescription($data->getDescription());

        $em=$this->getDoctrine()->getManager();
        $em->persist($post);
        $em->flush();

        $response=array(

            'code'=>0,
            'message'=>'Post updated!',
            'errors'=>null,
            'result'=>null

        );
        return new JsonResponse($response,200);

    }

    /**
     * @Route("/api/posts/{id}",name="delete_post")
     * @Method({"DELETE"})
     */

    public function deletePost($id)
    {
        $post=$this->getDoctrine()->getRepository(Post::class)->find($id);

        if (empty($post)) {

            $response=array(

                'code'=>1,
                'message'=>'post Not found !',
                'errors'=>null,
                'result'=>null

            );
            return new JsonResponse($response, Response::HTTP_NOT_FOUND);
        }

        $em=$this->getDoctrine()->getManager();
        $em->remove($post);
        $em->flush();
        $response=array(

            'code'=>0,
            'message'=>'post deleted !',
            'errors'=>null,
            'result'=>null

        );
        return new JsonResponse($response,200);
    }

}
