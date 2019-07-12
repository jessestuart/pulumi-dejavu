import fp from 'lodash/fp'
import * as k8s from '@pulumi/kubernetes'

const APP_NAME = 'dejavu'

const appLabels = { app: APP_NAME }
const deployment = new k8s.apps.v1.Deployment(APP_NAME, {
  metadata: {
    namespace: 'pulumi',
  },
  spec: {
    selector: { matchLabels: appLabels },
    replicas: 1,
    template: {
      metadata: { labels: appLabels },
      spec: { containers: [{ name: APP_NAME, image: 'appbaseio/dejavu' }] },
    },
  },
})
const deploymentLabels = deployment.spec.template.metadata.labels

export const deploymentName = deployment.metadata.apply(fp.get('name'))

const frontend = new k8s.core.v1.Service(APP_NAME, {
  metadata: {
    labels: deploymentLabels,
    namespace: 'pulumi',
  },
  spec: {
    type: 'LoadBalancer',
    ports: [{ port: 80, targetPort: 1358, protocol: 'TCP' }],
    selector: appLabels,
  },
})

// @ts-ignore
export const serviceName: string = frontend.metadata.apply(fp.get('name'))
export const serviceIP = frontend.status.apply(
  fp.get('loadBalancer.ingress[0].ip'),
)

new k8s.networking.v1beta1.Ingress(APP_NAME, {
  metadata: {
    namespace: 'pulumi',
    annotations: {
      'traefik.frontend.rule.type': 'PathPrefix',
    },
  },
  spec: {
    rules: [
      {
        host: 'pulumi-dejavu.jesses.io',
        http: {
          paths: [
            {
              backend: {
                serviceName,
                servicePort: 80,
              },
              path: '/',
            },
          ],
        },
      },
    ],
  },
})
