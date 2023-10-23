import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Channels } from 'src/entities/Channels';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { Workspaces } from 'src/entities/Workspaces';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspaces)
    private workspacesRepository: Repository<Workspaces>,
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMembersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private channelMembersRepository: Repository<ChannelMembers>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private dataSource: DataSource,
  ) {}

  async findById(id: number) {
    return this.workspacesRepository.findOne({ where: { id } });
  }

  async findMyWorkspaces(myId: number) {
    return this.workspacesRepository.find({
      where: {
        WorkspaceMembers: [{ UserId: myId }],
      },
    });
  }

  async createWorkspace(name: string, url: string, myId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const workspace = this.workspacesRepository.create({
        name,
        url,
        OwnerId: myId,
      });
      const returned = await this.workspacesRepository.save(workspace);

      const workspaceMember = new WorkspaceMembers();
      workspaceMember.UserId = myId;
      workspaceMember.WorkspaceId = returned.id;
      const channel = new Channels();
      channel.name = '일반';
      channel.WorkspaceId = returned.id;

      const [, channelReturned] = await Promise.all([
        this.channelsRepository.save(channel),
        this.workspaceMembersRepository.save(workspaceMember),
      ]);

      const channelMember = new ChannelMembers();
      channelMember.UserId = myId;
      channelMember.ChannelId = channelReturned[0].id;
      await this.channelMembersRepository.save(channelMember);

      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getWorkspaceMembers(url: string) {
    return this.usersRepository
      .createQueryBuilder('user')
      .innerJoin('user.WorkspaceMembers', 'members')
      .innerJoin('members.Workspace', 'workspace', 'w.url = :url', {
        url,
      })
      .getMany();
  }

  async createWorkspaceMembers(url: string, email: string) {
    const workspace = await this.workspacesRepository.findOne({
      where: { url },
      relations: ['Channels'],
    });
    // this.workspacesRepository
    //   .createQueryBuilder('workspace')
    //   .innerJoinAndSelect('workspace.Channels', 'channels')
    //   .getOne();

    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const workspaceMember = new WorkspaceMembers();
    workspaceMember.WorkspaceId = workspace.id;
    workspaceMember.UserId = user.id;
    await this.workspaceMembersRepository.save(workspaceMember);

    const channelMember = new ChannelMembers();
    channelMember.ChannelId = workspace.Channels.find(
      (v) => v.name === '일반',
    ).id;
    channelMember.UserId = user.id;
    await this.channelMembersRepository.save(channelMember);
  }

  async getWorkspaceMember(url: string, id: number) {
    // this.usersRepository
    //   .createQueryBuilder('user')
    //   .insert()
    //   .into(Users)
    //   .values(new Users())
    //   .execute();
    return (
      this.usersRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id })
        // .andWhere('user.name= :name', { name })
        .innerJoin('user.Workspaces', 'workspaces', 'workspaces.url = :url', {
          url,
        })
        .getOne()
    );
  }
}
