
import { Cluster } from '../models/cluster.model';
import { Service } from '../models/service.model';
import { Host } from '../models/host.model';

export const performSearch = async (query: string) => {
    const regex = new RegExp(query, 'i');
    const [clusters, services, hosts] = await Promise.all([
        Cluster.find({ name: regex }).limit(5),
        Service.find({ name: regex }).limit(5),
        Host.find({ name: regex }).limit(5),
    ]);

    return {
        clusters: clusters.map(item => item.toJSON()),
        services: services.map(item => item.toJSON()),
        hosts: hosts.map(item => item.toJSON()),
    };
};
