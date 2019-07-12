### pulumi-dejavu

#### What is this?

Simple proof-of-concept deployment of @appbaseio’s [DejaVu][github] on
@kubernetes, with provisioning / lifecycle management defined in Typescript with
the @pulumi SDK.

#### Why?

I found the webdocs to be pretty difficult to navigate, but the inline
documentation is extensive and helpful. The Pulumi SDK interfaces are
well-defined and -typed, and map more-or-less directly to the Kubernetes
primitives (which may be a pro or a con, depending on your opinions on the
topic).

#### Takeaways?

While I can't say I see much benefit to the SDK for small projects
/ deployments — after all, you're end up essentially transposing the K8S YAML
resource manifests you've gotten used to working with _back_ into JSON — I can
see the benefit of using a more imperative language to reduce boilerplate,
easily differentiate between production and staging "stacks" at runtime, etc;
similar to e.g., the (no longer maintained) [ksonnet][github 2] project.

[github]: https://github.com/appbaseio/dejavu
[github 2]: https://github.com/ksonnet/ksonnet
