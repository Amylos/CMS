<?php

namespace App\Repository;

use App\Entity\DataCSV;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<DataCSV>
 *
 * @method DataCSV|null find($id, $lockMode = null, $lockVersion = null)
 * @method DataCSV|null findOneBy(array $criteria, array $orderBy = null)
 * @method DataCSV[]    findAll()
 * @method DataCSV[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DataCSVRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DataCSV::class);
    }

//    /**
//     * @return DataCSV[] Returns an array of DataCSV objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('d')
//            ->andWhere('d.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('d.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?DataCSV
//    {
//        return $this->createQueryBuilder('d')
//            ->andWhere('d.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
