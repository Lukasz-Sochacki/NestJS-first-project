import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.services';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: { product: true, client: true },
    });
  }

  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: { product: true, client: true },
    });
  }

  public deleteById(id: Order['id']): Promise<Order> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }

  public async create(orderData: {
    productId?: string;
    clientId: string;
  }): Promise<Order> {
    const { productId, clientId } = orderData;

    try {
      return await this.prismaService.order.create({
        data: {
          client: {
            connect: { id: clientId },
          },
          ...(productId && {
            product: {
              connect: { id: productId },
            },
          }),
        },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new BadRequestException("Product or client doesn't exist");
      }
      throw error;
    }
  }

  public updateById(
    id: Order['id'],
    orderData: Partial<Omit<Order, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Order> {
    const { productId, clientId, ...rest } = orderData;

    return this.prismaService.order.update({
      where: { id },
      data: {
        ...rest,

        ...(productId !== undefined && {
          product: productId
            ? { connect: { id: productId } }
            : { disconnect: true },
        }),

        ...(clientId && {
          client: {
            connect: { id: clientId },
          },
        }),
      },
    });
  }
}
